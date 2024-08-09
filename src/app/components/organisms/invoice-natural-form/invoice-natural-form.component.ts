import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { GlobalService } from '../../../services/global.service';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { InfStepOneComponent } from '../../molecules/inf-step-one/inf-step-one.component';
import { InfStepTwoComponent } from '../../molecules/inf-step-two/inf-step-two.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

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
    FileboxComponent
  ],
  templateUrl: './invoice-natural-form.component.html',
  styleUrls: ['./invoice-natural-form.component.css']
})
export class InvoiceNaturalFormComponent {
  invoiceNaturalForm: FormGroup;
  @Input() currentStep: number = 1
  disabledControls: string[] = [
    'personType', 'documentType', 'documentNumber', 'fullName', 'address', 'email', 'position', 'bankBranch', 'bankKey', 'bankAccountType', 'contractNumber'
  ]
  @Input() vendorInfo: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private gS: GlobalService
  ) {
    this.invoiceNaturalForm = formBuilder.group({
      orderIds: formBuilder.array([formBuilder.control('')]),
      personType: formBuilder.control(''),
      documentType: formBuilder.control(''),
      documentNumber: formBuilder.control(''),
      fullName: formBuilder.control(''),
      address: formBuilder.control(''),
      email: formBuilder.control('', Validators.email),
      position: formBuilder.control(''),
      bankBranch: formBuilder.control(''),
      bankKey: formBuilder.control(''),
      bankAccountType: formBuilder.control(''),
      signatureAuth: formBuilder.control('', Validators.requiredTrue),
      signature: formBuilder.control('', Validators.required),
      contractNumber: formBuilder.control(''),
      phone: formBuilder.control(''),
      institutionalEmail: formBuilder.control('', Validators.email),
      incomeTaxReturn: formBuilder.control(''),
      exceedsIncome: formBuilder.control(''),
      taxCondition: formBuilder.control(''),
      medicalPrepaid: formBuilder.control(''),
      medicalPrepaidFile: formBuilder.control(''),
      housingCredit: formBuilder.control(''),
      housingCreditFile: formBuilder.control(''),
      dependents: formBuilder.control(''),
      afcContributions: formBuilder.control(''),
      afcContributionsEntity: formBuilder.control(''),
      afcContributionsAccountNumber: formBuilder.control(''),
      afcContributionsFile: formBuilder.control(''),
      afcContributionsValue: formBuilder.control(0),
      voluntaryPensionContributions: formBuilder.control(''),
      voluntaryPensionContributionsEntity: formBuilder.control(''),
      voluntaryPensionContributionsAccountNumber: formBuilder.control(''),
      voluntaryPensionContributionsFile: formBuilder.control(''),
      voluntaryPensionContributionsValue: formBuilder.control(0),
      signatureAuthTwo: formBuilder.control('', Validators.requiredTrue),
      signatureTwo: formBuilder.control('', Validators.required),
    });
  }

  ngOnInit(){
    // disable fields
    this.disabledControls.forEach(control => {
      this.invoiceNaturalForm.get(control)?.disable();
    });
  }

  ngOnChanges() {
    if (this.vendorInfo) {
        this.gS.fillInitialInvoiceNaturalForm(this.invoiceNaturalForm, this.vendorInfo);
        // Todos los campos no son editables
        this.invoiceNaturalForm.get('signatureAuth')?.enable();
        this.invoiceNaturalForm.get('signature')?.enable();
    }
}

  getOrderIds() {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  addOrderId() {
    this.getOrderIds().push(this.formBuilder.control(''));
  }

  getControl(controlName: string) {
    return this.invoiceNaturalForm.get(controlName) as FormControl;
  }

  sendForm() {
    console.log('Form sent', this.invoiceNaturalForm.value);
    this.nextStep();
  }

  setCheckboxControl(event: any, controlName: string) {
    this.invoiceNaturalForm.get(controlName)?.setValue(event.target.checked);
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm.get(controlName)?.value;
    
  }

  nextStep() {
    if(this.currentStep < 3) {
      this.currentStep++;
      console.log(this.currentStep)
    }
  }

  previousStep() {
    if(this.currentStep > 1) {
      this.currentStep--;
      console.log(this.currentStep)
    }
  }
}