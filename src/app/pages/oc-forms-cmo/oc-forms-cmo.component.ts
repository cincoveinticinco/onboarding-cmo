import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { InvoiceNaturalFormComponent } from '../../components/organisms/invoice-natural-form/invoice-natural-form.component';
import { AuthOcService } from '../../services/auth-oc.service';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [PanelButtonsComponent, LogoComponent, InvoiceNaturalFormComponent],
  templateUrl: './oc-forms-cmo.component.html',
  styleUrls: ['./oc-forms-cmo.component.css']
})
export class OcFormsCmoComponent implements OnInit {
  loading = false;
  vendorInfo: any = {};
  currentStep = 1;

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
        this.loading = false;
      },
      () => {
        this.authService.logOut();
      }
    );
  }

  saveForm(): void {
    console.log('Form saved');
  }

  handleStepChange(event: 'next' | 'previous'): void {
    if (event === 'next' && this.currentStep < 3) {
      this.currentStep++;
    } else if (event === 'previous' && this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
