import { Component } from '@angular/core';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-datos-contables-fiscales',
  standalone: true,
  imports: [
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleComponent
  ],
  templateUrl: './datos-contables-fiscales.component.html',
  styleUrl: './datos-contables-fiscales.component.css'
})
export class DatosContablesFiscalesComponent {

}
