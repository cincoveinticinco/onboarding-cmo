import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';


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
    ElectronicSignatureAuthComponent
  ],
  templateUrl: './inf-step-two.component.html',
  styleUrl: './inf-step-two.component.css'
})
export class InfStepTwoComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  onSubmit() {
    this.formSubmit.emit();
  }

}
