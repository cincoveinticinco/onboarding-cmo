import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-firma',
  standalone: true,
  imports: [
    TextInputComponent
  ],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.css'
})
export class FirmaComponent {

}
