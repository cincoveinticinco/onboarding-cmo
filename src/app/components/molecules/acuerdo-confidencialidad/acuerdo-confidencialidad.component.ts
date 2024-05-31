import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-acuerdo-confidencialidad',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent
  ],
  templateUrl: './acuerdo-confidencialidad.component.html',
  styleUrl: './acuerdo-confidencialidad.component.css'
})
export class AcuerdoConfidencialidadComponent {

}
