import { Component, Input, OnInit } from '@angular/core';
import { TIPOPERSONA } from '../../../shared/interfaces/typo_persona';
import { VendorService } from '../../../services/vendor.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { CommonModule } from '@angular/common';
import { VENDORFORMSTATUS } from '../../../shared/interfaces/typo_vendor_form_status';
import { GlobalService } from '../../../services/global.service';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-documentation-form',
  standalone: true,
  imports: [ReactiveFormsModule, FileboxComponent, CommonModule, BlackButtonComponent],
  templateUrl: './documentation-form.component.html',
  styleUrl: './documentation-form.component.css'
})
export class DocumentationFormComponent implements OnInit {

  @Input() typeVendor: any = null;

  readonly TIPOPERSONA = TIPOPERSONA;
  readonly VENDORFORMSTATUS = VENDORFORMSTATUS;
  readonly apiUrlFront = environment.apiUrlFront;

  loading: boolean = false;
  documents: any[] = [];
  documentForm: FormGroup;
  linkDocument: any = null;
  filesDynamic: {[key: number]: string} = {};
  subs: Subscription[] = [];

  nonRequiredDocuments: number[] = [329];

  constructor(private _vS: VendorService, private fb: FormBuilder, private _gS: GlobalService, private router: Router) {
    this.documentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadData();

    this.subs.push(this.documentForm.valueChanges.subscribe((valor: any) => {
      Object.keys(this.documentForm.controls).forEach((controlName: any) => {
        const control = this.documentForm.get(controlName);
        if (control && control.dirty) {
          const foundKey = Object.keys(this.filesDynamic).find((key: any) => this.filesDynamic[key] === controlName);
          if (foundKey) {
            const fileData = {
              formControlName: controlName,
              value: control?.value?.file,
              vendor_id: this._vS.getVendorId(),
            };
            this.submitFile(fileData);
            control.markAsPristine();
          }
        }
      });
      var data = {
        typeForm: VENDORFORMSTATUS.VINCULACION,
        form: valor
      };
      this._vS.setGeneralForm(data);
    }));
  }

  loadData() {
    this.loading = true;
    this.subs.push(this._vS.getDocumentsData().subscribe({
      next: ((data: any) => {
        this.documents = data.f_vendor_document_types || [];
        this.setFormData();
        this.loading = false;
      })
    }));
  }

  setFormData() {
    this.documents.forEach((dc: any) => {
      this.documentForm.addControl(`document_${dc.id}`, new FormControl('', [Validators.required]));
      if (this.nonRequiredDocuments.includes(dc.id)) this.documentForm.get(`document_${dc.id}`) ?.clearValidators()
      this.documentForm.get(`document_${dc.id}`)?.setValue(this.setDynamicFiles(dc));
      dc['class'] = '';
      if (dc.document_type.length > 120 ) dc['class'] = 'large-txt';
    });
    this.documents.forEach((dc: any) => {
      this.filesDynamic[dc.id] = `document_${dc.id}`;
    })
  }

  onSubmit() {
    if (!this.documentForm.invalid) {
      var params = { third_form: true }
      this.subs.push(this._vS.setNextVendorStatus().subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['thanks-docs', this._vS.getVendorId()]);
        }
      }));
    }
    else {
      Object.values(this.documentForm.controls).forEach((control: any) => {
        control?.markAsTouched();
      });
    }
  }

  getErrorMessage(docId: any) {
    let control = this.documentForm.get(`document_${docId}`);
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es requerido *';
    }
    return
  }

  submitFile(ev: any) {
    this.loading = true;
    const { value, formControlName } = ev;
    const fileIdDocument = Object.keys(this.filesDynamic).find(
      (key) =>
      this.filesDynamic[key as unknown as keyof typeof this.filesDynamic] == formControlName
    );
    const documentId = this._gS.getDocumentLink(fileIdDocument)?.document_id;
    if (!value) {
      this._vS.deleteVendorDocument({ document_id: documentId })
      .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this._gS.normalizeString(value.name);
      this._vS.getPresignedPutURL(nameFile, ev.vendor_id).pipe(
        catchError((error) =>
          of({ id: fileIdDocument, file: value, key: '', url: '' })
        ),
        map((putUrl: any) => ({
          ...putUrl,
          id: fileIdDocument,
          file: value,
        })),
        switchMap((uploadFile: any) => {
          if (!uploadFile.url) {
            return of({ blobFile: null, uploadFile });
          }
          return new Promise(resolve => {
            uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
          });
        }),
        switchMap((blobUpdateFile: any) => {
          const { blobFile, uploadFile } = blobUpdateFile;
          if (!blobFile) {
            return of(uploadFile);
          }
          return this._vS.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => of({ ...value, url: '' })),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap(
          (uploadFile: any) => {
            if (!uploadFile) return of(false);
            return this._vS.updateVendorDocument({
              vendor_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
              ? `${ev.vendor_id}/${nameFile}`
              : '',
            });
          }
        ),
        map((response: any) => {
          this.linkDocument = response;
        })
      )
      .subscribe((value) => {
        setTimeout(() => { this.loading = false }, 3000)
      });
    }
  }

  setDynamicFiles(doc: any) {
    const file = doc.link ? { name: doc.link, url: doc.link} : null;
    return file;
  }

  get fDocuments() {
    return this.documentForm.controls;
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
