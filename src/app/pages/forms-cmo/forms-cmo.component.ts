import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormHeaderComponent } from '../../components/molecules/form-header/form-header.component';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { VinculacionNaturalComponent } from '../../components/organisms/vinculacion-natural/vinculacion-natural.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VinculacionJuridicaComponent } from '../../components/organisms/vinculacion-juridica/vinculacion-juridica.component';
import { VendorService } from '../../services/vendor.service';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
import { VENDORFORMSTATUS } from '../../shared/interfaces/typo_vendor_form_status';
import { DocumentationFormComponent } from '../../components/organisms/documentation-form/documentation-form.component';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { file_types } from '../../shared/interfaces/files_types';

@Component({
  selector: 'app-forms-cmo',
  standalone: true,
  imports: [
    FormHeaderComponent,
    PanelButtonsComponent,
    VinculacionNaturalComponent,
    VinculacionJuridicaComponent,
    DocumentationFormComponent
  ],
  templateUrl: './forms-cmo.component.html',
  styleUrl: './forms-cmo.component.css'
})
export class FormsCmoComponent implements OnInit {
  personEnnum = TIPOPERSONA;
  typePerson: number = TIPOPERSONA.Natural;
  title: string = '';
  loading: boolean = false;
  vendorId: any;
  vendorStatus: any;
  VENDORSTATUS = VENDORFORMSTATUS;
  linkDocument: any = null;

  lists: any = {
    documentTypes: [],
    economicActivities: [],
    vendorInfo: null
  };

  constructor(
    private vendorService: VendorService,
    private globalService: GlobalService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.vendorId = params.id;
      this.vendorService.setVendorId(params.id);
      this.loadData();
    })
  }

  loadData() {
    this.loading = true;
    this.vendorService.getVendorInfo().subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.lists = {
          documentTypes: response.f_document_type_ids,
          economicActivities: response?.economic_activities,
          vendorInfo: response?.vendor_basic_info,
          riskLevels: response?.arl_risk_levels
        };
        this.typePerson = response.vendor_basic_info?.f_person_type_id
        console.log('typePerson', this.typePerson);
        this.vendorStatus = response?.vendor_status
        this.vendorService.setDocumentsList(response.document_vendor);
        console.log('DOCS LIST', this.vendorService.getDocumentsList())
        this.getTitle();
        this.loading = false;
      },
      error: (e: any) => {
        if (e.status == 401) this.auth.logOut(this.vendorId);
      }

    });
    console.log('this.lists', this.lists);
  }

  sendForm(ev: any) {
    const formData = this.globalService.setVinculationForm(ev.form);
    console.log('formData', formData);
    this.vendorService.updateVendor(formData).subscribe((response: any) => {
      return ev.nextForm && this.vendorService.setNextVendorStatus().subscribe((response: any) => {
        this.loadData();
      });
    });
  }

  submitFile(ev: any) {
    this.loading = true;
    const { value, formControlName } = ev;

    const fileIdDocument = Object.keys(file_types).find(
      (key) =>
      file_types[key as unknown as keyof typeof file_types] == formControlName
    );

    // const documentId = this.globalService.getDocumentLink(fileIdDocument)?.document_id;
    console.log(value, 'VALUE')
    if (!value) {
      // this.vendorService.deleteVendorDocument({ document_id: documentId })
      // .subscribe((data) => this.loading = false);
    }
    else {
      const nameFile = this.globalService.normalizeString(value.name);
      this.vendorService.getPresignedPutURL(nameFile, ev.vendor_id).pipe(
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
          return this.vendorService.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => of({ ...value, url: '' })),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap(
          (uploadFile: any) => {
            if (!uploadFile) return of(false);
            return this.vendorService.updateVendorDocument({
              vendor_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
              ? `${ev.vendor_id}/${nameFile}`
              : ``,
            });
          }
        ),
        map((response: any) => {
          console.log('responsesssasasdaasd', response);
          this.linkDocument = response;
        })
      )
      .subscribe((value) => {
        setTimeout(() => { 
          this.loading = false;
        }, 3500)
      });
    }
  }

  getTitle() {
    switch (this.vendorStatus) {
      case VENDORFORMSTATUS.CREADO:
        switch (this.typePerson) {
          case TIPOPERSONA.Natural:
            this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
            break;
          case TIPOPERSONA.Juridica:
            this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA JURIDICA';
            break;
          default:
            this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
            break;
        }
        break;
      case VENDORFORMSTATUS.VINCULACION:
        switch (this.typePerson) {
          case TIPOPERSONA.Natural:
            this.title = 'CARGA DOCUMENTOS PERSONA NATURAL';
            break;
          case TIPOPERSONA.Juridica:
            this.title = 'CARGA DOCUMENTOS PERSONA JURIDICA';
            break;
          default:
            this.title = 'CARGA DOCUMENTOS';
            break;
        }
        break;
    }
  }
}
