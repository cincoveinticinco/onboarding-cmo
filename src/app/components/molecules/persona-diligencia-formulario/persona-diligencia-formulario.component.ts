import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

@Component({
  selector: 'app-persona-diligencia-formulario',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent
  ],
  templateUrl: './persona-diligencia-formulario.component.html',
  styleUrl: './persona-diligencia-formulario.component.css'
})
export class PersonaDiligenciaFormularioComponent {

}
