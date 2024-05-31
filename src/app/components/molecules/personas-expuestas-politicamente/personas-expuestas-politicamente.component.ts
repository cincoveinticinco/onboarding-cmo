import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-personas-expuestas-politicamente',
  standalone: true,
  imports: [
    SubtitleComponent,
    CheckboxInputComponent
  ],
  templateUrl: './personas-expuestas-politicamente.component.html',
  styleUrl: './personas-expuestas-politicamente.component.css'
})
export class PersonasExpuestasPoliticamenteComponent {

}
