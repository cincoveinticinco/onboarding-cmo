import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-datos-financieros',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
  ],
  templateUrl: './datos-financieros.component.html',
  styleUrl: './datos-financieros.component.css'
})
export class DatosFinancierosComponent {

}
