import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

@Component({
  selector: 'app-firma',
  standalone: true,
  imports: [
    TextInputComponent,
    FileboxComponent
  ],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.css'
})
export class FirmaComponent {

}
