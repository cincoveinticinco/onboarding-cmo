import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-datos-contacto-emergencia',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent
  ],
  templateUrl: './datos-contacto-emergencia.component.html',
  styleUrl: './datos-contacto-emergencia.component.css'
})
export class DatosContactoEmergenciaComponent {

}
