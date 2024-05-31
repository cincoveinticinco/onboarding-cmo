import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

@Component({
  selector: 'app-datos-representante-legal',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './datos-representante-legal.component.html',
  styleUrl: './datos-representante-legal.component.css'
})
export class DatosRepresentanteLegalComponent {

}
