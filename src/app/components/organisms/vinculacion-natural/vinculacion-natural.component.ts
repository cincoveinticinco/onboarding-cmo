import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelButtonsComponent } from '../../molecules/panel-buttons/panel-buttons.component';
import { VendorService } from '../../../services/vendor.service';
import { GlobalService } from '../../../services/global.service';
import { Subscription } from 'rxjs';
import { file_types } from '../../../shared/interfaces/files_types';

@Component({
  selector: 'app-vinculacion-natural',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
    FirmaComponent,
    BlackButtonComponent,
    PanelButtonsComponent
  ],
  templateUrl: './vinculacion-natural.component.html',
  styleUrl: './vinculacion-natural.component.css'
})
export class VinculacionNaturalComponent {
  naturalForm: FormGroup;
  @Input() lists: any = {};
  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitFile: EventEmitter<any> = new EventEmitter();

  subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private _gS: GlobalService, private _vS: VendorService) {
    this.naturalForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      document_type_id: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      pepff: new FormControl(''),
      ciiu: new FormControl(''),
      economic_activity_id: new FormControl('', [Validators.required]),
      economic_activity: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      emergency_contact_name: new FormControl('', [Validators.required]),
      emergency_contact_telephone: new FormControl('', [Validators.required]),
      emergency_contact_kinship: new FormControl('', [Validators.required]),
      eps: new FormControl('', [Validators.required]),
      afp: new FormControl('', [Validators.required]),
      layoffs: new FormControl('', [Validators.required]),
      arl: new FormControl('', [Validators.required]),
      risk_level: new FormControl('', [Validators.required]),
      illness: new FormControl('', [Validators.required]),
      illness_description: new FormControl(''),
      medicines: new FormControl('', [Validators.required]),
      medicines_description: new FormControl(''),
      phobias: new FormControl('', [Validators.required]),
      phobias_description: new FormControl(''),
      allergies: new FormControl('', [Validators.required]),
      allergies_description: new FormControl(''),
      food_restrictions: new FormControl('', [Validators.required]),
      food_restrictions_description: new FormControl(''),
      is_pep: new FormControl('', [Validators.required]),
      confidential_responsible_address: new FormControl('', [Validators.required]),
      confidential_responsible_email: new FormControl('', [Validators.required]),
      accounting_responsible_email: new FormControl('', [Validators.required]),
      income_tax_declarant: new FormControl('', [Validators.required]),
      dependents: new FormControl('', [Validators.required]),
      prepaid_medicine: new FormControl('', [Validators.required]),
      mortgage_credit: new FormControl('', [Validators.required]),
      voluntary_contributions: new FormControl('', [Validators.required]),
      afc_account: new FormControl('', [Validators.required]),
      vat_responsible: new FormControl('', [Validators.required]),
      simple_regime: new FormControl('', [Validators.required]),
      form_responsible_name: new FormControl('', [Validators.required]),
      form_responsible_document: new FormControl('', [Validators.required]),
      signature: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lists'] && this.lists.vendorInfo && this.naturalForm) {
      this._gS.fillInitialVinculationForm(this.naturalForm, this.lists.vendorInfo);
      this.naturalForm.get('date')?.setValue(this._gS.formatDate(this.lists.vendorInfo.created_at));
      this.naturalForm.controls['date'].disable();
      this.naturalForm.get('type')?.setValue('VINCULACION PERSONA NATURAL');
      this.naturalForm.controls['type'].disable();
    }
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.naturalForm.get('date')?.setValue(this._gS.formatDate(this.lists.vendorInfo.created_at));
    this.naturalForm.controls['date'].disable();
    this.naturalForm.get('type')?.setValue('VINCULACION PERSONA NATURAL');
    this.naturalForm.controls['type'].disable();
  }

  subscribeToFormChanges() {
    Object.keys(this.naturalForm.controls).forEach(controlName => {
      const control = this.naturalForm.get(controlName);
      if (control) {
        const sub = control.valueChanges.subscribe(value => {
          if (control) {
            const foundKey = Object.keys(file_types).find((key: any) => file_types[key] === controlName);
            if (foundKey) {
              const fileData = {
                formControlName: controlName,
                value: value?.file,
                vendor_id: this._vS.getVendorId()
              };
              this.onSubmitFile.emit(fileData);
              control.markAsPristine();
            }
          }
        });
        this.subs.push(sub);
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.naturalForm.valid) {
      return;
    } else {
      Object.values(this.naturalForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      const invalidElements = document.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        invalidElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendForm() {
    if (this.naturalForm.valid) {
      let data = {
        form: this.naturalForm.value,
        nextForm: true
      }
      this.notify.emit(data);
    } else {
      this.logFormErrors(this.naturalForm);
    }
  }

  saveForm() {
    let data = {
      form: this.naturalForm.value,
      nextForm: false
    }
    this.notify.emit(data);
  }

  logFormErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        console.log(`Control: ${key}, Errors:`, controlErrors);
      }
    });
  }
}
