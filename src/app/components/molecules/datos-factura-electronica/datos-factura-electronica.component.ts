import { Component } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-datos-factura-electronica',
  standalone: true,
  imports: [
    TextInputComponent,
    SelectInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-factura-electronica.component.html',
  styleUrl: './datos-factura-electronica.component.css'
})
export class DatosFacturaElectronicaComponent {

}
