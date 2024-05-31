import { Component } from '@angular/core';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';
import { DatosContratistaComponent } from '../../molecules/datos-contratista/datos-contratista.component';
import { DatosContablesFiscalesComponent } from '../../molecules/datos-contables-fiscales/datos-contables-fiscales.component';
import { DatosSaludComponent } from '../../molecules/datos-salud/datos-salud.component';
import { DatosContactoEmergenciaComponent } from '../../molecules/datos-contacto-emergencia/datos-contacto-emergencia.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';
import { DeclaracionPepComponent } from '../../molecules/declaracion-pep/declaracion-pep.component';
import { DeclaracionSagrilaftComponent } from '../../molecules/declaracion-sagrilaft/declaracion-sagrilaft.component';
import { AcuerdoConfidencialidadComponent } from '../../molecules/acuerdo-confidencialidad/acuerdo-confidencialidad.component';
import { AutorizacionDatosPersonalesComponent } from '../../molecules/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { FirmaComponent } from '../../molecules/firma/firma.component';

@Component({
  selector: 'app-vinculacion-natural',
  standalone: true,
  imports: [
    InitialDataComponent,
    DatosEmpresaComponent,
    DatosContratistaComponent,
    DatosContablesFiscalesComponent,
    DatosSaludComponent,
    DatosContactoEmergenciaComponent,
    PersonasExpuestasPoliticamenteComponent,
    DeclaracionPepComponent,
    DeclaracionSagrilaftComponent,
    AcuerdoConfidencialidadComponent,
    AutorizacionDatosPersonalesComponent,
    BlackButtonComponent,
    FirmaComponent
  ],
  templateUrl: './vinculacion-natural.component.html',
  styleUrl: './vinculacion-natural.component.css'
})
export class VinculacionNaturalComponent {

}
