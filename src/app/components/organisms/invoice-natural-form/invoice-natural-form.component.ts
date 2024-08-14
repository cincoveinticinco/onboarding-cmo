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
      phone: this.formBuilder.control('', [Validators.required]),
      institutionalEmail: this.formBuilder.control('', [Validators.required, Validators.email]),
      incomeTaxReturn: this.formBuilder.control('', [Validators.required]),
      exceedsIncome: this.formBuilder.control('', [Validators.required]),
      taxCondition: this.formBuilder.control('', [Validators.required]),
      medicalPrepaid: this.formBuilder.control('', [Validators.required]),
      medicalPrepaidFile: this.formBuilder.control(''),
      housingCredit: this.formBuilder.control('', [Validators.required]),
      housingCreditFile: this.formBuilder.control(''),
      dependents: this.formBuilder.control('', [Validators.required]),
      afcContributions: this.formBuilder.control('', [Validators.required]),
      afcContributionsEntity: this.formBuilder.control(''),
      afcContributionsAccountNumber: this.formBuilder.control(''),
      afcContributionsFile: this.formBuilder.control(''),
      afcContributionsValue: this.formBuilder.control(''),
      voluntaryPensionContributions: this.formBuilder.control('', [Validators.required]),
      voluntaryPensionContributionsEntity: this.formBuilder.control(''),
      voluntaryPensionContributionsAccountNumber: this.formBuilder.control(''),
      voluntaryPensionContributionsFile: this.formBuilder.control(''),
      voluntaryPensionContributionsValue: this.formBuilder.control(''),
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

  validateStepOne(): { isValid: boolean; firstInvalidControl: string | null } {
    let isValid = true;
    let firstInvalidControl: string | null = null;
    const signatureAuth = this.getControl('signatureAuth');
    const signature = this.getControl('signature');
  
    const orderIdsControls = this.getOrderIds().controls as FormControl[];
  
    for (let i = 0; i < orderIdsControls.length; i++) {
      const control = orderIdsControls[i];
      if (!control.value) {
        control.setErrors({ required: true });
        control.markAsTouched();
        firstInvalidControl = `purchaseOrder-${i}`;
        isValid = false;
        return { isValid, firstInvalidControl };
      } else {
        control.setErrors(null);
      }
    }
  
    // Validate signatureAuth
    if (!signatureAuth.value) {
      signatureAuth.setErrors({ required: true });
      signatureAuth.markAsTouched();
      if (isValid) {
        firstInvalidControl = 'signatureAuth';
        isValid = false;
      }
    } else {
      signatureAuth.setErrors(null);
    }

    if (!signature.value) {
      signature.setErrors({ required: true });
      signature.markAsTouched();
      if (isValid) {
        firstInvalidControl = 'signature';
        isValid = false;
      }
    } else {
      signature.setErrors(null);
    }
  
    return { isValid, firstInvalidControl };
  }

  validateStepTwo(): { isValid: boolean; firstInvalidControl: string | null } {
    let isValid = true;
    let firstInvalidControl: string | null = null;

    const controlsToValidate = [
      'phone', 'institutionalEmail', 'incomeTaxReturn', 'exceedsIncome', 'taxCondition', 'medicalPrepaid', 'medicalPrepaidFile', 'housingCredit', 'housingCreditFile', 'dependents', 'afcContributions', 'afcContributionsEntity', 'afcContributionsAccountNumber', 'afcContributionsFile', 'afcContributionsValue', 'voluntaryPensionContributions', 'voluntaryPensionContributionsEntity', 'voluntaryPensionContributionsAccountNumber', 'voluntaryPensionContributionsFile', 'voluntaryPensionContributionsValue', 'signatureAuthTwo', 'signatureTwo'
    ];

    for (let i = 0; i < controlsToValidate.length; i++) {
      const control = this.getControl(controlsToValidate[i]);
      if ((control.invalid) && control) {
        control.markAsTouched();
        console.log('ERROR IN CONTROL', controlsToValidate[i]);
        if (isValid) {
          firstInvalidControl = controlsToValidate[i];
          isValid = false;
        }
      } else {
        control.setErrors(null);
      }
    }

    return { isValid, firstInvalidControl };
  }


  nextStep(): void {
    if (this.currentStep === 1) {
      const { isValid, firstInvalidControl } = this.validateStepOne();
      if (isValid) {
        this.handleStepChange.emit('next');
      } else if (firstInvalidControl) {
        this.scrollToError(firstInvalidControl);
      }
    } else if (this.currentStep === 2) {
      const { isValid, firstInvalidControl } = this.validateStepTwo();
      if (isValid) {
        this.handleStepChange.emit('next');
      } else if (firstInvalidControl) {
        this.scrollToError(firstInvalidControl);
      }
    }
  }

  scrollToError(controlName: string): void {
    console.log('Scrolling to', controlName);
    setTimeout(() => {
      const element = document.getElementById(controlName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  previousStep(): void {
    this.handleStepChange.emit('previous');
  }
}
