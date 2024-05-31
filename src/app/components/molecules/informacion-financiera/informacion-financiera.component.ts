import { Component } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent
  ],
  templateUrl: './informacion-financiera.component.html',
  styleUrl: './informacion-financiera.component.css'
})
export class InformacionFinancieraComponent {

}
