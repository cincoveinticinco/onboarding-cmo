import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';
import { InfdependentCertificationComponent } from '../inf-dependent-certification/inf-dependent-certification.component';

export interface DependentForm {
  dependentDocumentTypeId: number;
  dependentDocumentNumber: number;
  dependentFullName: string;
  dependentKinship: string;
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
    InfdependentCertificationComponent
  ],
  templateUrl: './inf-step-two.component.html',
  styleUrl: './inf-step-two.component.css'
})

export class InfStepTwoComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Input() validateStep: any;
  @Input() loading: boolean = false;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  // scroll to top when render the component

  ngOnInit() {
    this.scrollToTop();
    const thereAreDependents = this.getValue('dependentsInfo')?.length > 0;
    if(thereAreDependents) {
      this.goToDependentsForm();
    }
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  renderDependentsForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getDependents(): FormArray {
    return this.invoiceNaturalForm.get('dependentsInfo') as FormArray;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  goToDependentsForm() {
    this.renderDependentsForm = true;
    if(this.getDependents().length === 0) {
      this.addNewDependentFormGroup();
    }
  }

  onSubmit() {
    const haveDependents = this.getValue('dependents') !== '0';
    
    if (!haveDependents) {
      this.formSubmit.emit();
      return;
    }
    
    if (!this.renderDependentsForm) {
      const { isValid, firstInvalidControl } = this.validateStep();
      if (isValid) {
        this.goToDependentsForm();
      } else {
        this.scrollToError(firstInvalidControl);
      }
      return;
    }
    
    if (this.renderDependentsForm) {
      const { isValid, firstInvalidControl } = this.validateDependentForm();
      if (isValid) {
        this.formSubmit.emit();
      } else {
        this.scrollToError(firstInvalidControl);
      }
    }
  }

  addNewDependentFormGroup() {
    const newDependentForm = this.formBuilder.group({
      dependentDocumentTypeId: ['', [Validators.required]],
      dependentDocumentNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dependentFullName: ['', [Validators.required]],
      dependentKinship: ['', [Validators.required]],
      decreaseInTaxBase: [false, [Validators.required]],
      minorChildren: [false, [Validators.required]],
      minorChildrenFile: [''],
      childrenStudyCertificateFile: [''],
      childrenStudyCertificate: [false, [Validators.required]],
      childrenMedicineCertificate: [false, [Validators.required]],
      childrenMedicineCertificateFile: [''],
      partnerMedicineCertificate: [false, [Validators.required]],
      partnerMedicineCertificateFile: [''],
      familyMedicineCertificate: [false, [Validators.required]],
      familyMedicineCertificateFile: ['']
    });
    this.getDependents().push(newDependentForm);
    console.log(this.invoiceNaturalForm)
  }

  validateDependentForm() {
    const dependentsForms = this.getDependentsForms();
    let isValid = true;
    let firstInvalidControl: any = null;

    dependentsForms.forEach((dependentForm: FormGroup) => {
      Object.keys(dependentForm.controls).forEach((controlName, index) => {
        const control = dependentForm.get(controlName);
        if(control?.invalid) {
          isValid = false;
          control.markAsTouched()
          control.markAsPristine();
          control.markAsDirty();
          const setInvalidControl = (controlName: any)  => {
            if(!firstInvalidControl) {
              firstInvalidControl = `${controlName}-${index + 1}`;
            }
          }
          setInvalidControl(controlName);
        }
      });
    });

    return { isValid, firstInvalidControl }
  }

  scrollToError(controlName: string | null): void {
      console.log('Scrolling to', controlName);
      setTimeout(() => {
        if (controlName) {
          const element = document.getElementById(controlName);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }

  getDependentsForms() {
    return this.getDependents().controls as FormGroup[];
  }

  handlePreviousStep() {
    if(this.renderDependentsForm) {
      this.renderDependentsForm = false;
      return;
    }

    this.previousStep.emit();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
