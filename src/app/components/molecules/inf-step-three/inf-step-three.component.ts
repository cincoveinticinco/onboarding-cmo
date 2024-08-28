import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

@Component({
  selector: 'app-inf-step-three',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    FileboxComponent
  ],
  templateUrl: './inf-step-three.component.html',
  styleUrl: './inf-step-three.component.css'
})
export class InfStepThreeComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  dependentsInfo: FormArray | undefined;


  onSubmit() {
    this.formSubmit.emit();
  }

  ngOnInit() {
    if(this.invoiceNaturalForm?.get('otherAnexes')?.value.length === 0) {
      this.addNewAnexFormGroup();
    }
    this.dependentsInfo= this.invoiceNaturalForm?.get('dependentsInfo') as FormArray;
  }

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getOtherAnexesArray(): FormArray {
    return this.invoiceNaturalForm.get('otherAnexes') as FormArray;
  }

  getOtherAnexesControls() {
    return this.getOtherAnexesArray().controls as FormControl[];
  }

  addNewAnexFormGroup() {
    this.getOtherAnexesArray().push(new FormControl('', [Validators.required]));
  }

  handlePreviousStep() {
    this.previousStep.emit();
  }

  deleteAnnex(index: number) {
    this.getOtherAnexesArray().removeAt(index);
  }
}
