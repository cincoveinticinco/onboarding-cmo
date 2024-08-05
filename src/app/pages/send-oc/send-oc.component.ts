import { Component } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../components/atoms/text-input/text-input.component';

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
  constructor(
    fb: FormBuilder
  ) {
    this.sendOcForm = fb.group({
      email: '',
    });
  }

  sendForm() {
    console.log(this.sendOcForm.value);
  }

  getControl(controlName: string) {
    return this.sendOcForm?.get(controlName);
  }
}
