import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { Router } from '@angular/router';
import { SelectOption } from '../../molecules/inf-step-one/inf-step-one.component';
import { PurchaseOrders } from '../../../pages/oc-forms-cmo/oc-forms-cmo.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';

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
    private router: Router
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

  onSubmit() {
    console.log('Form saved', this.vendorInfo);
    this.router.navigate(['/oc-forms-cmo/success']);
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
}
