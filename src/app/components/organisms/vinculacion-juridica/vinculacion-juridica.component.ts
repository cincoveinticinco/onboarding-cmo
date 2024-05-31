import { Component } from '@angular/core';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';
import { DatosRepresentanteLegalComponent } from '../../molecules/datos-representante-legal/datos-representante-legal.component';
import { DatosFacturaElectronicaComponent } from '../../molecules/datos-factura-electronica/datos-factura-electronica.component';
import { DatosContabilidadComponent } from '../../molecules/datos-contabilidad/datos-contabilidad.component';
import { DatosContactoComercialComponent } from '../../molecules/datos-contacto-comercial/datos-contacto-comercial.component';
import { DatosFiscalesComponent } from '../../molecules/datos-fiscales/datos-fiscales.component';
import { DatosTesoreriaComponent } from '../../molecules/datos-tesoreria/datos-tesoreria.component';
import { DatosFinancierosComponent } from '../../molecules/datos-financieros/datos-financieros.component';
import { AutorizacionDatosPersonalesComponent } from '../../molecules/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { DeclaracionSagrilaftComponent } from '../../molecules/declaracion-sagrilaft/declaracion-sagrilaft.component';
import { AcuerdoConfidencialidadComponent } from '../../molecules/acuerdo-confidencialidad/acuerdo-confidencialidad.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';
import { DeclaracionPepComponent } from '../../molecules/declaracion-pep/declaracion-pep.component';
import { InformacionFinancieraComponent } from '../../molecules/informacion-financiera/informacion-financiera.component';
import { PersonaDiligenciaFormularioComponent } from '../../molecules/persona-diligencia-formulario/persona-diligencia-formulario.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';

@Component({
  selector: 'app-vinculacion-juridica',
  standalone: true,
  imports: [
    InitialDataComponent,
    DatosEmpresaComponent,
    DatosRepresentanteLegalComponent,
    DatosFacturaElectronicaComponent,
    DatosContabilidadComponent,
    DatosContactoComercialComponent,
    DatosFiscalesComponent,
    DatosTesoreriaComponent,
    DatosFinancierosComponent,
    AutorizacionDatosPersonalesComponent,
    DeclaracionSagrilaftComponent,
    AcuerdoConfidencialidadComponent,
    PersonasExpuestasPoliticamenteComponent,
    DeclaracionPepComponent,
    InformacionFinancieraComponent,
    PersonaDiligenciaFormularioComponent,
    BlackButtonComponent
  ],
  templateUrl: './vinculacion-juridica.component.html',
  styleUrl: './vinculacion-juridica.component.css'
})
export class VinculacionJuridicaComponent {

}
