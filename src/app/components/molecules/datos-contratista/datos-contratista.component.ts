import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-contratista',
  standalone: true,
  imports: [
    SubtitleComponent,
    SelectInputComponent,
    TextInputComponent
  ],
  templateUrl: './datos-contratista.component.html',
  styleUrl: './datos-contratista.component.css'
})
export class DatosContratistaComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
