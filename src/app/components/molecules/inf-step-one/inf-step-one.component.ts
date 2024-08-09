import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';

@Component({
  selector: 'app-inf-step-one',
  templateUrl: './inf-step-one.component.html',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, SubtitleComponent, CheckboxInputComponent, ElectronicSignatureAuthComponent],
  styleUrls: ['./inf-step-one.component.css']
})
export class InfStepOneComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Output() formSubmit = new EventEmitter<void>();

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