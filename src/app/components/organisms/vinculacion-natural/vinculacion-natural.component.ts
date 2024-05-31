import { Component } from '@angular/core';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';

@Component({
  selector: 'app-vinculacion-natural',
  standalone: true,
  imports: [
    InitialDataComponent,
    DatosEmpresaComponent,
  ],
  templateUrl: './vinculacion-natural.component.html',
  styleUrl: './vinculacion-natural.component.css'
})
export class VinculacionNaturalComponent {

}
