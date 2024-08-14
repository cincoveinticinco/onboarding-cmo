import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { InvoiceNaturalFormComponent } from '../../components/organisms/invoice-natural-form/invoice-natural-form.component';
import { AuthOcService } from '../../services/auth-oc.service';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { InvoiceJuridicaFormComponent } from '../../components/organisms/invoice-juridica-form/invoice-juridica-form.component';

export interface PurchaseOrders {
  id: number,
  consecutiveCodes: string,
  projectId: number,
}

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [PanelButtonsComponent, LogoComponent, InvoiceNaturalFormComponent, InvoiceJuridicaFormComponent],
  templateUrl: './oc-forms-cmo.component.html',
  styleUrls: ['./oc-forms-cmo.component.css']
})
export class OcFormsCmoComponent implements OnInit {
  loading = false;
  vendorInfo: any = {};
  currentStep = 1;
  purchaseOrders: PurchaseOrders[] = []; // Purchase orders related to vendor
  selectedPurchaseOrders: PurchaseOrders[] = []; // Purchase orders selected by user to be included in the form
  personType: number | undefined;
  purchaseOrdersProjections: any[] = [];
  PERSON_TYPES = TIPOPERSONA;

  constructor(
    private authService: AuthOcService, 
    private invoiceLodgingService: InvoiceLodgingService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getSession().then((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.authService.logOut();
      } else {
        this.loadFormInitialData();
      }
    });
  }

  private loadFormInitialData(): void {
    this.loading = true;
    this.invoiceLodgingService.getFormInitialData().subscribe(
      (response: any) => {
        this.vendorInfo = response.vendor;
        this.personType = response.fPersonTypeId;
        this.purchaseOrders = response.purchaseOrders;
        this.selectedPurchaseOrders = response.selectedOrders;
        this.purchaseOrdersProjections = response.poProjections;
        this.loading = false;
      },
      () => {
        this.authService.logOut();
      }
    );
  }

  saveForm(): void {
    console.log('Form saved', this.vendorInfo);
    this.router.navigate(['/oc-forms-cmo/success']);
  }

  handleStepChange(event: 'next' | 'previous'): void {
    if (event === 'next' && this.currentStep <= 3) {
      this.currentStep++;
      console.log('Current step', this.currentStep);
    } else if (event === 'previous' && this.currentStep > 1) {
      this.currentStep--;
    }

    if(event === 'next' && this.currentStep > 3) {
      this.saveForm();
    }
  }

  getFormattedOcOptions(purchaseOrders: PurchaseOrders[]): any[] {
    return purchaseOrders.map((order: any) => ({
      optionValue: order.id,
      optionName: order.consecutiveCodes   
    })) || [];
  }
}
