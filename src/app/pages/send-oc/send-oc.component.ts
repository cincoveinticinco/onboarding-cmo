import { Component } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../components/atoms/text-input/text-input.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';

@Component({
  selector: 'app-send-oc',
  standalone: true,
  imports: [
    LogoComponent, 
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './send-oc.component.html',
  styleUrl: './send-oc.component.css'
})
export class SendOcComponent {
  sendOcForm: FormGroup;
  emailSent: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private iS: InvoiceLodgingService
  ) {
    this.sendOcForm = this.fb.group({
      email: [''],
      purchaseOrdersIds: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      const email = window.history.state.email;
      const purchaseOrdersIds = window.history.state.purchaseOrdersIds;
      console.log(email);
      console.log(purchaseOrdersIds);
      if (email && purchaseOrdersIds) {
        this.sendOcForm.patchValue({
          email,
          purchaseOrdersIds: purchaseOrdersIds.join(', ')
        });
      } else {
        this.router.navigate(['/oc-error']);
      }
    });
  }

  sendForm() {
    this.iS.sendPurchaseOrdersToEmail(this.sendOcForm.value).subscribe(
      (response) => {
        this.emailSent = true;
      });
  }

  backToHome() {
    this.router.navigate(['/facturascmo']);
  }

  getControl(controlName: string) {
    return this.sendOcForm?.get(controlName);
  }
}
