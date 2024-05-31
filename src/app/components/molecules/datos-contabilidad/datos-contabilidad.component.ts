import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-datos-contabilidad',
  standalone: true,
  imports: [
    TextInputComponent,
    SelectInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-contabilidad.component.html',
  styleUrl: './datos-contabilidad.component.css'
})
export class DatosContabilidadComponent {

}
