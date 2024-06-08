import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
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
export class FormsCmoComponent implements OnInit {
  personEnnum = TIPOPERSONA;
  typePerson: number = TIPOPERSONA.Natural;
  title: string = '';
  
  lists: any = {
    documentTypes: [],
    economicActivities: [],
    vendorInfo: null
  };

  constructor(
    private vendorService: VendorService,
    private globalService: GlobalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getTitle();
    this.loadData();
  }

  loadData() {
    this.vendorService.getVendorInfo().subscribe((response: any) => {
      console.log('response', response);
      this.lists = {
        documentTypes: response.f_document_type_ids,
        economicActivities: response.economic_activities,
        vendorInfo: response?.vendor_basic_info
      };
      this.cd.detectChanges();
    });
    console.log('this.lists', this.lists);
  }

  sendForm(ev: any) {
    console.log('ev', ev.value);
    const formData = this.globalService.setVinculationForm(ev.value);
    console.log('formData', formData);
    this.vendorService.updateVendor(formData).subscribe((response: any) => {
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
