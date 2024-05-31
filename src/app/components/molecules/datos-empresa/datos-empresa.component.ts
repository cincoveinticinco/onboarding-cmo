import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.css'
})
export class DatosEmpresaComponent {

}
