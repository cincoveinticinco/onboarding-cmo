import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormHeaderComponent } from '../../components/molecules/form-header/form-header.component';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { VinculacionNaturalComponent } from '../../components/organisms/vinculacion-natural/vinculacion-natural.component';
import { Router } from '@angular/router';
import { VinculacionJuridicaComponent } from '../../components/organisms/vinculacion-juridica/vinculacion-juridica.component';
import { VendorService } from '../../services/vendor.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-forms-cmo',
  standalone: true,
  imports: [
    FormHeaderComponent,
    PanelButtonsComponent,
    VinculacionNaturalComponent,
    VinculacionJuridicaComponent
  ],
  templateUrl: './forms-cmo.component.html',
  styleUrl: './forms-cmo.component.css'
})
export class FormsCmoComponent {
  personEnnum = TIPOPERSONA;
  typePerson: number = TIPOPERSONA.Natural;
  title: string = '';

  constructor(private _vS: VendorService, private _gS: GlobalService, private router: Router) {
  }
  
  ngOnInit() {
    this.getTitle();
  }

  sendForm(ev: any) {
    console.log('ev', ev)
    const formData = this._gS.setVinculationForm(ev.value);
    this._vS.updateVendor(formData).subscribe((response: any) => {
        console.log('response', response);
    });
  }
  
  getTitle() {
    switch (this.typePerson) {
      case TIPOPERSONA.Natural:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
        break;
      case TIPOPERSONA.Juridica:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA JURIDICA';
        break;
      default:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
        break;
    }
  }
}
