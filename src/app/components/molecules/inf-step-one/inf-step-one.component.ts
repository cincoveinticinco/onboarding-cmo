import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

export interface SelectOption {
  optionName: string;
  optionValue: string;
}

@Component({
  selector: 'app-inf-step-one',
  templateUrl: './inf-step-one.component.html',
  standalone: true,
  imports: [
    TextInputComponent, 
    ReactiveFormsModule, 
    SubtitleComponent, 
    CheckboxInputComponent, 
    ElectronicSignatureAuthComponent, 
    SelectInputComponent
  ],
  styleUrls: ['./inf-step-one.component.css']
})

export class InfStepOneComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Input() selectOptionsPo?: SelectOption[];
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {}

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  getPurchaseOrdersArray(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  getPurchaseOrdersControls() {
    return this.getPurchaseOrdersArray().controls as FormControl[];
  }

  getPurchaseOrderValue(index: number) {
    return this.getPurchaseOrdersArray().at(index).value;
  }

  getOrderIds(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  deletePurchaseOrderControl(index: number): void {
    if(index > 0) {
      this.getOrderIds().removeAt(index);
    }
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control(0));
  }

  updateSelectOptionsPo(selectOptionsPo: SelectOption[] | undefined) {
    if (selectOptionsPo) {
      this.selectOptionsPo = selectOptionsPo;
    }
  }

  onSubmit() {
    this.formSubmit.emit();
  }
}