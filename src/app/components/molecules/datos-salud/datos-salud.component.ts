import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-datos-salud',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    CheckboxInputComponent
  ],
  templateUrl: './datos-salud.component.html',
  styleUrl: './datos-salud.component.css'
})
export class DatosSaludComponent {

}
