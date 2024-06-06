import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';
import { DatosRepresentanteLegalComponent } from '../../molecules/datos-representante-legal/datos-representante-legal.component';
import { DatosFacturaElectronicaComponent } from '../../molecules/datos-factura-electronica/datos-factura-electronica.component';
import { DatosContabilidadComponent } from '../../molecules/datos-contabilidad/datos-contabilidad.component';
import { DatosFiscalesComponent } from '../../molecules/datos-fiscales/datos-fiscales.component';
import { DatosTesoreriaComponent } from '../../molecules/datos-tesoreria/datos-tesoreria.component';
import { DatosContactoComercialComponent } from '../../molecules/datos-contacto-comercial/datos-contacto-comercial.component';
import { DatosFinancierosComponent } from '../../molecules/datos-financieros/datos-financieros.component';
import { AutorizacionDatosPersonalesComponent } from '../../molecules/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';
import { DeclaracionPepComponent } from '../../molecules/declaracion-pep/declaracion-pep.component';
import { DeclaracionSagrilaftComponent } from '../../molecules/declaracion-sagrilaft/declaracion-sagrilaft.component';
import { AcuerdoConfidencialidadComponent } from '../../molecules/acuerdo-confidencialidad/acuerdo-confidencialidad.component';
import { InformacionFinancieraComponent } from '../../molecules/informacion-financiera/informacion-financiera.component';
import { PersonaDiligenciaFormularioComponent } from '../../molecules/persona-diligencia-formulario/persona-diligencia-formulario.component';
import { PanelButtonsComponent } from '../../molecules/panel-buttons/panel-buttons.component';

@Component({
  selector: 'app-vinculacion-juridica',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InitialDataComponent,
    BlackButtonComponent,
    DatosEmpresaComponent,
    DatosRepresentanteLegalComponent,
    DatosFacturaElectronicaComponent,
    DatosContabilidadComponent,
    DatosFiscalesComponent,
    DatosTesoreriaComponent,
    DatosContactoComercialComponent,
    DatosFinancierosComponent,
    AutorizacionDatosPersonalesComponent,
    PersonasExpuestasPoliticamenteComponent,
    DeclaracionPepComponent,
    DeclaracionSagrilaftComponent,
    AcuerdoConfidencialidadComponent,
    InformacionFinancieraComponent,
    PersonaDiligenciaFormularioComponent,
    PanelButtonsComponent
  ],
  templateUrl: './vinculacion-juridica.component.html',
  styleUrls: ['./vinculacion-juridica.component.css']
})
export class VinculacionJuridicaComponent {
  juridicaForm: FormGroup;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.juridicaForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      legal_representatives_name: new FormControl('', [Validators.required]),
      f_document_representative: new FormControl('', [Validators.required]),
      legal_representatives_telephone: new FormControl('', [Validators.required]),
      legal_representatives_email: new FormControl('', [Validators.required]),
      electronic_billing_name: new FormControl('', [Validators.required]),
      electronic_billing_email: new FormControl('', [Validators.required]),
      electronic_billing_telephone: new FormControl('', [Validators.required]),
      accounting_responsible_name: new FormControl('', [Validators.required]),
      accounting_responsible_telephone: new FormControl('', [Validators.required]),
      accounting_responsible_email: new FormControl('', [Validators.required]),
      accounting_responsible_position: new FormControl('', [Validators.required]),
      ciiu: new FormControl('', [Validators.required]),
      simple_regime: new FormControl('', [Validators.required]),
      self_withholding: new FormControl('', [Validators.required]),
      big_contributor: new FormControl('', [Validators.required]),
      treasury_responsible_name: new FormControl('', [Validators.required]),
      treasury_responsible_telephone: new FormControl('', [Validators.required]),
      treasury_responsible_email: new FormControl('', [Validators.required]),
      treasury_responsible_position: new FormControl('', [Validators.required]),
      commercial_responsible_name: new FormControl('', [Validators.required]),
      commercial_responsible_telephone: new FormControl('', [Validators.required]),
      commercial_responsible_email: new FormControl('', [Validators.required]),
      last_close_assets: new FormControl('', [Validators.required]),
      last_year_assets: new FormControl('', [Validators.required]),
      last_close_liabilities: new FormControl('', [Validators.required]),
      last_year_liabilities: new FormControl('', [Validators.required]),
      last_close_income: new FormControl('', [Validators.required]),
      last_year_income: new FormControl('', [Validators.required]),
      last_close_equity: new FormControl('', [Validators.required]),
      last_year_equity: new FormControl('', [Validators.required]),
      last_close_expenses: new FormControl('', [Validators.required]),
      last_year_expenses: new FormControl('', [Validators.required]),
      is_pep: new FormControl('', [Validators.required]),
      confidential_responsible_address: new FormControl('', [Validators.required]),
      confidential_responsible_email: new FormControl('', [Validators.required]),
      form_responsible_name: new FormControl('', [Validators.required]),
      form_responsible_document: new FormControl('', [Validators.required]),
      form_responsible_position: new FormControl('', [Validators.required]),
    });
  }

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.juridicaForm.valid) {
      return;
    } else {
      Object.values(this.juridicaForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      const invalidElements = document.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        invalidElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendForm() {
    if (this.juridicaForm.valid) {
      console.log(this.juridicaForm.value);
      // this.notify.emit(this.juridicaForm);
    } else {
      console.log(this.juridicaForm.value)
      Object.values(this.juridicaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  saveForm() {
    console.log('SENDING FORM TO SAVE ....')
    console.log(this.juridicaForm)
    this.notify.emit(this.juridicaForm);
  }
}
