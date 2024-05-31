import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';

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

}
