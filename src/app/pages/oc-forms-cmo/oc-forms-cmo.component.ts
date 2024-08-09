import { Component } from '@angular/core';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { AuthOcService } from '../../services/auth-oc.service';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { Router } from '@angular/router';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { InvoiceNaturalFormComponent } from '../../components/organisms/invoice-natural-form/invoice-natural-form.component';

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [PanelButtonsComponent, LogoComponent, InvoiceNaturalFormComponent],
  templateUrl: './oc-forms-cmo.component.html',
  styleUrl: './oc-forms-cmo.component.css'
})
export class OcFormsCmoComponent {
  loading: boolean = false;
  vendorInfo: any = {};
  currentStep = 1;

  constructor( 
    private auth: AuthOcService, 
    private _iS: InvoiceLodgingService, 
    private router: Router,
  ) {
    
  }

  ngOnInit() {
    this.auth.getSession().then((isLoggedIn: any) => {
      if (!isLoggedIn) {
        this.auth.logOut();
      } else {
        this.loadFormInitialData();
      }
    });
  }

  loadFormInitialData() {
    this.loading = true;
    this._iS.getFormInitialData().subscribe(
      (response: any) => {
        this.vendorInfo = response.vendor;
        this.loading = false;
      },
      (error) => {
        this.auth.logOut();
      } 
    );
  }

  saveForm() {
    console.log('Form saved');
  }
}
