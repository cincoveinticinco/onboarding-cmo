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
import { catchError, filter, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';
import { environment } from '../../../../environments/environment';
import { VendorService } from '../../../services/vendor.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-invoice-juridica-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    SelectInputComponent,
    MatIconModule
  ],
  templateUrl: './invoice-juridica-form.component.html',
  styleUrl: './invoice-juridica-form.component.css'
})
export class InvoiceJuridicaFormComponent {
  @Input() vendorInfo: any;
  @Input() purchaseOrders: PurchaseOrders[] | undefined;
  @Input() selectedPurchaseOrders: PurchaseOrders[] | undefined
  @Input() selectOptionsPo?: SelectOption[];

  @Output() saveForm = new EventEmitter()

  loading = false

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

    console.log(this.selectOptionsPo)
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
    })
  }

  cancelLoading() {
    this.loading = false
  }

  async onSubmit() {
    this.loading = true
    await this.uploadFiles(['electronicInvoice', 'socialSecurity', 'taxAuditorCertificate', 'arlCertificate']);
    await this.uploadFilesFromArrayOfControls(this.getOtherAnexesArray());
    this.ilsService.updateRegisterVendor(this.invoiceJuridicaForm.value);
    this.saveForm.emit({
      form: this.invoiceJuridicaForm,
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
      }
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
  }): Observable<any> {
    const {value, formControl} = event;
    console.log('event', event);
  
    const control = formControl;
  
    // get vendor id
    const vendorId = this.ilsService.getVendorId();
  
    if (!value) {
      // Function to delete file in the backend
      // Implement file deletion logic here
      return of(null);
    } else {
      const nameFile = this.globalService.normalizeString(value.name);
      if (vendorId) {
        return this.ilsService.getPresignedPutURLOc(nameFile, vendorId).pipe(
          catchError(() => {
            if (environment?.stage != 'local') {
              control.setValue(null, { emitEvent: false });
              this.globalService.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
              return throwError(() => new Error('Error al obtener la URL de subida.'));
            } else {
              return of({ id: value, file: value, key: '', url: '' });
            }
          }),
          switchMap((putUrl: any) => {
            if (!putUrl.url) {
              // Handle local case: create a local URL
              const localUrl = `${vendorId}/${nameFile}`;
              return of({ localUrl, putUrl });
            }
            return from(value.arrayBuffer()).pipe(
              map(arrayBuffer => ({ arrayBuffer, putUrl }))
            );
          }),
          switchMap((result: any) => {
            if (result.localUrl) {
              // Local case: return the local URL
              return of({ url: result.localUrl });
            }
            if (!result.arrayBuffer) return of(null);
            return this.vendorService.uploadFileUrlPresigned(
              new Blob([result.arrayBuffer]), 
              result.putUrl.url, 
              value.type
            ).pipe(
              catchError(() => {
                if (environment?.stage != 'local') {
                  control.setValue(null, { emitEvent: false });
                  this.globalService.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
                  return throwError(() => new Error('Error al subir el archivo.'));
                } else {
                  return of(null);
                }
              }),
              map(response => response.type === HttpEventType.Response ? result.putUrl : null)
            );
          }),
          filter(result => result !== null),
          tap((result: any) => {
            console.log('File processed successfully:', result);
            const url = result?.url || `${vendorId}/${nameFile}`;
            const previousValue = control.value;
            control.setValue({ ...previousValue, url });
          })
        );
      } else {
        console.error('No vendor ID available');
        return throwError('No vendor ID available');
      }
    }
  }

  async uploadFiles(controlNames: string[]): Promise<void> {
    const uploadPromises = controlNames.map((controlName: string) => {
      return new Promise<void>((resolve) => {
        const control = this.getControl(controlName);
        const file = control.value.file;
        if (file) {
          this.submitFile({ value: file, formControl: control }).subscribe(
            () => resolve(),
            () => resolve() 
          );
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
        const file = control.value.file;
        if (file) {
          this.submitFile({ value: file, formControl: control }).subscribe(
            () => resolve(),
            () => resolve()
          );
        } else {
          
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }
}
