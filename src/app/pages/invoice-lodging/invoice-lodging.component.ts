import { Component } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { SelectInputComponent } from '../../components/atoms/select-input/select-input.component';
import { TextInputComponent } from '../../components/atoms/text-input/text-input.component';
import { Router } from '@angular/router';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';

@Component({
  selector: 'app-invoice-lodging',
  standalone: true,
  imports: [
    LogoComponent, 
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    SelectInputComponent,
    TextInputComponent
  ],
  templateUrl: './invoice-lodging.component.html',
  styleUrl: './invoice-lodging.component.css'
})
export class InvoiceLodgingComponent {
  invoiceLodgingForm: FormGroup;

  constructor(public fb: FormBuilder, public router: Router, private iS: InvoiceLodgingService) {
    this.invoiceLodgingForm = fb.group({
      personType: new FormControl(TIPOPERSONA.Natural, [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      orderNumber: new FormControl('', [Validators.required]),
    })
  }

  loadDocumentTypes() {
    this.iS.getDocumentTypes().subscribe((data) => {
      console.log(data);
    })
  }

  sendForm() {
    console.log(this.invoiceLodgingForm.value);
  }

  getControl(controlName: string) {
    return this.invoiceLodgingForm?.get(controlName) as FormControl;
  }

  validatyDocumentTypeAndNumber() {
    const documentType = this.getControl('documentType').value;
    const documentNumber = this.getControl('documentNumber').value;
    // si los campos esta llenos, navegar a la ruta /sent-oc, si no, touch los campos
  
  
    if(documentType && documentNumber) {
      this.router.navigate(['/sent-oc']);
      return true
    } else {
      this.getControl('documentType').markAsTouched();
      this.getControl('documentNumber').markAsTouched();
      return false;
    }
  }

  ngOnInit() {
    this.loadDocumentTypes();
  }

}
