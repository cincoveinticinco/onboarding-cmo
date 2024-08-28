import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

import { SelectOption } from '../../molecules/inf-step-one/inf-step-one.component';
import { PurchaseOrders } from '../../../pages/oc-forms-cmo/oc-forms-cmo.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';
import { environment } from '../../../../environments/environment';
import { VendorService } from '../../../services/vendor.service';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-juridica-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    SelectInputComponent,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './invoice-juridica-form.component.html',
  styleUrls: ['./invoice-juridica-form.component.css']
})
export class InvoiceJuridicaFormComponent {
  @Input() vendorInfo: any;
  @Input() purchaseOrders: PurchaseOrders[] | undefined;
  @Input() selectedPurchaseOrders: PurchaseOrders[] | undefined;
  @Input() selectOptionsPo?: SelectOption[];

  @Output() saveForm = new EventEmitter();

  loading = false;

  invoiceJuridicaForm: any;
  availableOptions: any = [];

  ngOnInit(){
    this.globalService.fillInitialInvoiceJuridicaForm(this.invoiceJuridicaForm, this.vendorInfo);
    const anexesLength = this.vendorInfo?.anexes?.length || 0;
    if(anexesLength === 0){
      this.addNewAnexFormGroup();
    } 
    this.selectedPurchaseOrders?.forEach((po: PurchaseOrders, index: number) => {
      this.addPurchaseOrderControl();
      this.fillPurchaseOrderControl(index, po.id.toString());
    });

    console.log(this.selectOptionsPo);
  }

  getFormattedOcOptions(purchaseOrders: PurchaseOrders[]): SelectOption[] {
    return purchaseOrders.map((order: any) => ({
      optionValue: order.id,
      optionName: order.consecutive_codes   
    })) || [];
  }

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private ilsService: InvoiceLodgingService,
    private vendorService: VendorService
  ) {
    this.invoiceJuridicaForm = this.formBuilder.group({
      orderIds: this.formBuilder.array([]),
      personType: this.formBuilder.control({ value: '', disabled: true }),
      documentType: this.formBuilder.control({ value: '', disabled: true }),
      documentNumber: this.formBuilder.control({ value: '', disabled: true }),
      companyName: this.formBuilder.control({ value: '', disabled: true }),
      address: this.formBuilder.control({ value: '', disabled: true }),
      email: this.formBuilder.control({ value: '', disabled: true }),
      electronicInvoice: this.formBuilder.control('', Validators.requiredTrue),
      socialSecurity: this.formBuilder.control('', Validators.requiredTrue),
      taxAuditorCertificate: this.formBuilder.control('', Validators.requiredTrue),
      arlCertificate: this.formBuilder.control('', Validators.requiredTrue),
      otherAnexes: this.formBuilder.array([]),
    });
  }

  cancelLoading() {
    this.loading = false;
  }

  async onSubmit() {
    this.loading = true;
    await this.uploadFiles(['electronicInvoice', 'socialSecurity', 'taxAuditorCertificate', 'arlCertificate']);
    await this.uploadFilesFromArrayOfControls(this.getOtherAnexesArray());
    this.ilsService.updateRegisterVendor(this.invoiceJuridicaForm.value);
    this.saveForm.emit({
      form: this.invoiceJuridicaForm.value,
      cancelLoading: this.cancelLoading
    });
    this.globalService.openSnackBar('Formulario enviado correctamente', '', 5000);
  }

  getControl(controlName: string) {
    return this.invoiceJuridicaForm?.get(controlName) as FormControl;
  }

  getOtherAnexesArray(): FormArray {
    return this.invoiceJuridicaForm.get('otherAnexes') as FormArray;
  }

  getOtherAnexesControls() {
    return this.getOtherAnexesArray().controls as FormControl[];
  }

  addNewAnexFormGroup() {
    this.getOtherAnexesArray().push(new FormControl(''));
  }

  fillPurchaseOrderControl(index: number, value: string) {
    this.getPurchaseOrdersArray().at(index).setValue(value);
  }

  updateSelectOptionsPo(selectOptionsPo: SelectOption[] | undefined) {
    if (selectOptionsPo) {
      const filteredOptions: SelectOption[] = selectOptionsPo.filter(option => {
        return !this.getOrderIds().value.includes(option.optionValue.toString());
      });
      this.availableOptions = {
        ...this.availableOptions,
        [`${this.getOrderIds().length - 1}`]: filteredOptions
      };
    }
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control(''));
    this.updateSelectOptionsPo(this.selectOptionsPo);
  }

  getOrderIds(): FormArray {
    return this.invoiceJuridicaForm.get('orderIds') as FormArray;
  }

  deletePurchaseOrderControl(index: number): void {
    if(index > 0) {
      this.getOrderIds().removeAt(index);
    }
  }

  getPurchaseOrdersArray(): FormArray {
    return this.invoiceJuridicaForm.get('orderIds') as FormArray;
  }

  getPurchaseOrdersControls() {
    return this.getPurchaseOrdersArray().controls as FormControl[];
  }

  submitFile(event: {
    value: File;
    formControl: FormControl
  }) {
    this.loading = true;
    const { value, formControl } = event;
  
    const vendorId: any = this.ilsService.getVendorId();
  
    if (!value) {
      const documentId = formControl.value.document_id;
      if(documentId) {
        this.vendorService.deleteVendorDocument({ document_id: documentId });
      }
    } else {
      const nameFile = this.globalService.normalizeString(value.name);
      const existingUrl = formControl.value.url;
      if(existingUrl) {
        console.log('File already uploaded', existingUrl);
        this.loading = false;
        return;
      }

      this.ilsService.getPresignedPutURLOc(nameFile, vendorId, "register").pipe(
        catchError((error) =>
          of({ id: value, file: value, key: '', url: '' })
        ),
        map((putUrl: any) => ({
          ...putUrl,
          id: value,
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
              catchError((_) => {
                if (environment?.stage != 'local') {
                  formControl.setValue(null, { emitEvent: false });
                  this.globalService.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
                  return throwError(() => new Error('Error al subir el archivo.'));
                } else {
                  return of({ ...value, url: '' });
                }
              }),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap((uploadFile: any) => {
          if (!uploadFile) return of(false);
          const document_url = uploadFile?.url ? `${vendorId}/${nameFile}` : '';
          const formControlCurrentValue = formControl.value;
          this.ilsService.signUrl(document_url).subscribe((res: any) => {
            formControl.setValue({
              document_id: formControlCurrentValue?.document_id,
              name: value.name,
              url: res.url,
              document_url: document_url
            });
          })
          return of(true);
        })
      )
      .subscribe((value) => {
        setTimeout(() => { 
          this.loading = false;
        }, 3500);
      });
    }
  }

  async uploadFiles(controlNames: string[]): Promise<void> {
    const uploadPromises = controlNames.map((controlName: string) => {
      return new Promise<void>((resolve) => {
        const control = this.getControl(controlName);
        const file = control.value?.file;
        if (file) {
          this.submitFile({ value: file, formControl: control });
          setTimeout(() => resolve(), 3500);
        } else {
          resolve();
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }

  async uploadFilesFromArrayOfControls(controlArray: FormArray): Promise<void> {
    const uploadPromises = controlArray.controls.map((control: any) => {
      return new Promise<void>((resolve) => {
        const file = control.value?.file;
        if (file) {
          this.submitFile({ value: file, formControl: control });
          setTimeout(() => resolve(), 3500);
        } else {
          resolve();
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }

  deleteAnnex(index: number) {
    this.getOtherAnexesArray().removeAt(index);
  }

  thereArePrechargedDocs(): boolean {
    const controlsToCheck = [
      'electronicInvoice',
      'socialSecurity',
      'taxAuditorCertificate',
      'arlCertificate'
    ];
  
    for (const control of controlsToCheck) {
      if (this.getControl(control)?.value?.url) {
        return true;
      }
    }
  
    if (this.getOtherAnexesControls().length > 0) {
      for (const anexo of this.getOtherAnexesControls()) {
        if (anexo.value?.url) {
          return true;
        }
      }
    }
  
    return false;
  }
}
