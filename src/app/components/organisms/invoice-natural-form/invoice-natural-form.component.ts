import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { InfStepOneComponent } from '../../molecules/inf-step-one/inf-step-one.component';
import { InfStepTwoComponent } from '../../molecules/inf-step-two/inf-step-two.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { InfStepThreeComponent } from '../../molecules/inf-step-three/inf-step-three.component';
import { SelectOption } from '../../molecules/inf-step-one/inf-step-one.component';
import { PurchaseOrders } from '../../../pages/oc-forms-cmo/oc-forms-cmo.component';
import { get } from 'http';

@Component({
  selector: 'app-invoice-natural-form',
  standalone: true,
  imports: [
    SubtitleComponent,
    ReactiveFormsModule,
    CheckboxInputComponent,
    CommonModule,
    TextInputComponent,
    InfStepOneComponent,
    InfStepTwoComponent,
    InfStepThreeComponent,
    FileboxComponent
  ],
  templateUrl: './invoice-natural-form.component.html',
  styleUrls: ['./invoice-natural-form.component.css']
})
export class InvoiceNaturalFormComponent implements OnInit, OnChanges {
  @Input() currentStep?: number;
  @Input() vendorInfo: any;
  @Input() purchaseOrders?: PurchaseOrders[];
  @Input() selectedPurchaseOrders?: PurchaseOrders[];
  @Output() handleStepChange = new EventEmitter<'next' | 'previous'>();
  formattedOcOptions: SelectOption[] = [];
  @Input() poProjections: any[] = [];

  invoiceNaturalForm: FormGroup;
  private disabledControls: string[] = [
    'personType', 'documentType', 'documentNumber', 'fullName', 'address', 'email', 'position', 
    'bankBranch', 'bankKey', 'bankAccountType', 'contractNumber'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) {
    this.invoiceNaturalForm = this.formBuilder.group({
      orderIds: this.formBuilder.array([]),
      personType: this.formBuilder.control({ value: '', disabled: true }),
      documentType: this.formBuilder.control({ value: '', disabled: true }),
      documentNumber: this.formBuilder.control({ value: '', disabled: true }),
      fullName: this.formBuilder.control({ value: '', disabled: true }),
      address: this.formBuilder.control({ value: '', disabled: true }),
      email: this.formBuilder.control({ value: '', disabled: true }, Validators.email),
      position: this.formBuilder.control({ value: '', disabled: true }),
      bankBranch: this.formBuilder.control({ value: '', disabled: true }),
      bankKey: this.formBuilder.control({ value: '', disabled: true }),
      bankAccountType: this.formBuilder.control({ value: '', disabled: true }),
      signatureAuth: this.formBuilder.control('', Validators.requiredTrue),
      signature: this.formBuilder.control('', Validators.required),
      contractNumber: this.formBuilder.control({ value: '', disabled: true }),
      phone: this.formBuilder.control(''),
      institutionalEmail: this.formBuilder.control('', Validators.email),
      incomeTaxReturn: this.formBuilder.control(''),
      exceedsIncome: this.formBuilder.control(''),
      taxCondition: this.formBuilder.control(''),
      medicalPrepaid: this.formBuilder.control(''),
      medicalPrepaidFile: this.formBuilder.control(''),
      housingCredit: this.formBuilder.control(''),
      housingCreditFile: this.formBuilder.control(''),
      dependents: this.formBuilder.control(''),
      afcContributions: this.formBuilder.control(''),
      afcContributionsEntity: this.formBuilder.control(''),
      afcContributionsAccountNumber: this.formBuilder.control(''),
      afcContributionsFile: this.formBuilder.control(''),
      afcContributionsValue: this.formBuilder.control(0),
      voluntaryPensionContributions: this.formBuilder.control(''),
      voluntaryPensionContributionsEntity: this.formBuilder.control(''),
      voluntaryPensionContributionsAccountNumber: this.formBuilder.control(''),
      voluntaryPensionContributionsFile: this.formBuilder.control(''),
      voluntaryPensionContributionsValue: this.formBuilder.control(0),
      signatureAuthTwo: this.formBuilder.control('', Validators.requiredTrue),
      signatureTwo: this.formBuilder.control('', Validators.required),
      dependentsInfo: this.formBuilder.array([]),
      otherAnexes: this.formBuilder.array([]),
      socialSecurity: this.formBuilder.control(''),
    });
  }

  ngOnInit(): void {
    this.disabledControls.forEach(control => {
      this.invoiceNaturalForm.get(control)?.disable();
    });
    this.selectedPurchaseOrders?.forEach((po: PurchaseOrders, index: number) => {
      this.addPurchaseOrderControl();
      this.fillPurchaseOrderControl(index, po.id);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendorInfo'] && this.vendorInfo) {
      this.globalService.fillInitialInvoiceNaturalForm(this.invoiceNaturalForm, this.vendorInfo);
      this.invoiceNaturalForm.get('signatureAuth')?.enable();
      this.invoiceNaturalForm.get('signature')?.enable();
    }
  }

  getOrderIds(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  updateFormattedOcOptions(): void {
    const selectedOrderIds = this.getOrderIds().value;
    const availablePurchaseOrders = this.purchaseOrders?.filter(
      (po: PurchaseOrders) => !selectedOrderIds.includes(po.id)
    ) || [];
    this.formattedOcOptions = this.getFormattedOcOptions(availablePurchaseOrders);
    console.log('Formatted options', this.formattedOcOptions);
  }

  addOrderId(): void {
    this.getOrderIds().push(this.formBuilder.control(''));
  }

  getControl(controlName: string): FormControl {
    return this.invoiceNaturalForm.get(controlName) as FormControl;
  }

  getFormattedOcOptions(purchaseOrders: any): SelectOption[] {
    const formattedPo = purchaseOrders.map((order: any) => ({
      optionValue: parseInt(order.id),
      optionName: order.consecutiveCodes
    })) || [];

    return formattedPo;
  }

  sendForm(): void {
    console.log('Form sent', this.invoiceNaturalForm.value);
    this.nextStep();
  }

  setCheckboxControl(event: any, controlName: string): void {
    this.invoiceNaturalForm.get(controlName)?.setValue(event.target.checked);
  }

  getValue(controlName: string): any {
    return this.invoiceNaturalForm.get(controlName)?.value;
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control('', [Validators.required]));
    this.updateFormattedOcOptions();
  }

  fillPurchaseOrderControl(index: number, value: number): void {
    this.getOrderIds().at(index).setValue(value.toString());
  }

  disablePurchaseOrderCOntrol(index: number): void {
    this.getOrderIds().at(index).disable();
  }

  getSelectedPurchaseOrders(): any {
    return this.getValue('orderIds').map((orderId: string) => {
      return this.purchaseOrders?.find((po: any) => po.id === orderId);
    });
  }


  nextStep(): void {
    this.handleStepChange.emit('next');
  }

  previousStep(): void {
    this.handleStepChange.emit('previous');
  }
}
