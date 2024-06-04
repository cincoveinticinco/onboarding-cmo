import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-fiscales',
  standalone: true,
  imports: [
    SubtitleComponent,
    SelectInputComponent,
    CheckboxInputComponent
  ],
  templateUrl: './datos-fiscales.component.html',
  styleUrl: './datos-fiscales.component.css'
})
export class DatosFiscalesComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
