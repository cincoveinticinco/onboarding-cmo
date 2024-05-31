import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-initial-data',
  standalone: true,
  imports: [
    TextInputComponent,
  ],
  templateUrl: './initial-data.component.html',
  styleUrl: './initial-data.component.css'
})
export class InitialDataComponent {

}
