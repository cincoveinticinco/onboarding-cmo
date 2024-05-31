import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-datos-contacto-comercial',
  standalone: true,
  imports: [
    TextInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-contacto-comercial.component.html',
  styleUrl: './datos-contacto-comercial.component.css'
})
export class DatosContactoComercialComponent {

}
