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
  
  loading: boolean = false;
  documents: any[] = [];
  documentForm: FormGroup;
  linkDocument: any = null;
  filesDynamic: {[key: number]: string} = {};
  subs: Subscription[] = [];

  constructor(private _vS: VendorService, private fb: FormBuilder, private _gS: GlobalService, private router: Router) {
    this.documentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadData();

    this.subs.push(this.documentForm.valueChanges.subscribe(valor => {
      Object.keys(this.documentForm.controls).forEach((controlName: any) => {
        const control = this.documentForm.get(controlName);
        if (control && control.dirty) {
          const foundKey = Object.keys(this.filesDynamic).find((key: any) => this.filesDynamic[key] === controlName);
          if (foundKey) {
            const fileData = {
              formControlName: controlName,
              value: control?.value?.file,
              crew_id: this._vS.getVendorId(),
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
        // this.documents = data.f_vendor_document_types || [];
        this.documents = [
          {
              id: '324',
              document_type: 'Signature'
          },
          {
              id: '325',
              document_type: 'Copia del documento de identidad del prestador del servicio'
          },
          {
              id: '326',
              document_type: 'RUT con antigüedad no mayor a un año'
          },
          {
              id: '327',
              document_type: 'Certificación bancaria no mayor a 90 días'
          },
          {
              id: '328',
              document_type: 'Foto a color tipo documento fondo blanco'
          },
          {
              id: '329',
              document_type: 'Certificación de afiliación al Sistema ARL'
          },
          {
              id: '330',
              document_type: 'Carta de autorización a CMO'
          },
          {
              id: '331',
              document_type: 'Cámara de comercio no mayor a 30 días'
          },
          {
              id: '332',
              document_type: 'Copia del documento de identidad del prestador del servicio'
          },
          {
              id: '333',
              document_type: 'Formato diligenciado y firmado de "Acuerdo de confidencialidad"'
          },
          {
              id: '334',
              document_type: 'Formato diligenciado y firmado de "Vinculación y/o actualización de datos"'
          }
      ];
      
        this.setFormData();
        this.loading = false;
      })
    }));
  }

  setFormData() {
    this.documents.forEach((dc: any) => {
      this.documentForm.addControl(`document_${dc.id}`, new FormControl('', [Validators.required]));
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
      Object.values(this.documentForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
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
      this._vS.getPresignedPutURL(nameFile, ev.crew_id).pipe(
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
              crew_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
              ? `${ev.crew_id}/${nameFile}`
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
