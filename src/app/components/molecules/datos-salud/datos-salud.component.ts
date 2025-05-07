import { Component, Input, OnInit } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { PercentPipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-datos-salud',
  standalone: true,
  imports: [
    PercentPipe,

    SubtitleComponent,
    TextInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,

    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './datos-salud.component.html',
  styleUrl: './datos-salud.component.css'
})
export class DatosSaludComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() lists: any = {};

  percentageRiskLevel: number = 0;

  ngOnInit(): void {
    this.getRiskPercentage();
    console.log(this.form);

    if (this.form?.get('layoffs')?.value == 'No aplica') {
      this.form?.get('aplicaCesantias')?.setValue(true);
      this.form?.get('layoffs')?.disable();
    }
    if (this.form?.get('arl')?.value == 'No aplica') {
      this.form?.get('aplicaArl')?.setValue(true);
      this.form?.get('arl')?.disable();
    }
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  showDescription(controlName: string): '0' | '1' {
    return this.getControl(controlName).value
  }

  getRiskPercentage() {
    this.percentageRiskLevel = this.lists?.riskLevels?.find((item: any) => item.id == this.getControl('risk_level')?.value)?.risk_percentage;
  }

  changeApplyCesantias() {
    this.form?.get('layoffs')?.setValue(this.form?.get('aplicaCesantias')?.value ? 'No aplica' : '');

    if (this.form?.get('aplicaCesantias')?.value) {
      this.form?.get('layoffs')?.disable();
    } else {
      this.form?.get('layoffs')?.enable();
    }
  }

  changeApplyArl() {
    this.form?.get('arl')?.setValue(this.form?.get('aplicaArl')?.value ? 'No aplica' : '');
    if (this.form?.get('aplicaArl')?.value) {
      this.form?.get('arl')?.disable();
    } else {
      this.form?.get('arl')?.enable();
    }
  }
}
