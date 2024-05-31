import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-datos-tesoreria',
  standalone: true,
  imports: [
    TextInputComponent,
    SubtitleComponent
  ],
  templateUrl: './datos-tesoreria.component.html',
  styleUrl: './datos-tesoreria.component.css'
})
export class DatosTesoreriaComponent {

}
