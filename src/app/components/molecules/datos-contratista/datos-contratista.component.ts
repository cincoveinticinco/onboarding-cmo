import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

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

}
