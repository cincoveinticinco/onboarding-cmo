import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';
import { InfDependantCertificationComponent } from '../inf-dependant-certification/inf-dependant-certification.component';

export interface DependantForm {
  dependantDocumentTypeId: number;
  dependantDocumentNumber: number;
  dependantFullName: string;
  dependantKinship: string;
  decreaseInTaxBase: boolean;
  minorChildredn: boolean;
  minorChildrenFile: string;
  childrenStudyCertificateFile: string;
  childrenStudyCertificate: boolean;
  childrenMedicineCertificate: boolean;
  childrenMedicineCertificateFile: string;
  partnerMedicineCertificate: boolean;
  partnerMedicineCertificateFile: string;
  familyMedicineCertificate: boolean;
  familyMedicineCertificateFile: string;
}

@Component({
  selector: 'app-inf-step-two',
  standalone: true,
  imports: [
    SubtitleComponent, 
    ReactiveFormsModule, 
    TextInputComponent, 
    CheckboxInputComponent, 
    SubtitleComponent,
    FileboxComponent,
    ElectronicSignatureAuthComponent,
    InfDependantCertificationComponent
  ],
  templateUrl: './inf-step-two.component.html',
  styleUrl: './inf-step-two.component.css'
})

export class InfStepTwoComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  dependents: FormArray;

  constructor( private formBuilder: FormBuilder) {
    this.dependents = formBuilder.array([]);
  }

  renderDependantsForm: boolean = false;

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  goToDependantsForm() {
    this.renderDependantsForm = true;
    if(this.dependents.length === 0) {
      this.addNewDependantFormGroup();
    }
  }

  onSubmit() {
    const haveDependants = this.getValue('dependents');
    if(haveDependants) {
      const formIsValid = this.invoiceNaturalForm.valid;
      this.goToDependantsForm();
    } else {
      this.formSubmit.emit();
    }
  }

  addNewDependantFormGroup() {
    this.dependents.push(this.formBuilder.group({
      dependantDocumentTypeId: [''],
      dependantDocumentNumber: [''],
      dependantFullName: [''],
      dependantKinship: [''],
      decreaseInTaxBase: [''],
      minorChildren: [''],
      minorChildrenFile: [''],
      childrenStudyCertificateFile: [''],
      childrenStudyCertificate: [''],
      childrenMedicineCertificate: [''],
      childrenMedicineCertificateFile: [''],
      partnerMedicineCertificate: [''],
      partnerMedicineCertificateFile: [''],
      familyMedicineCertificate: [''],
      familyMedicineCertificateFile: ['']
    }));
  }

  getDependentsForms() {
    return this.dependents.controls as FormGroup[];
  }

  handlePreviousStep() {
    if(this.renderDependantsForm) {
      this.renderDependantsForm = false;
    }

    this.previousStep.emit();
  }
}
