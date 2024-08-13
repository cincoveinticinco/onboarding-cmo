import { Component } from '@angular/core';
import { LogoComponent } from '../atoms/logo/logo.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AuthOcService } from '../../services/auth-oc.service';

@Component({
  selector: 'app-oc-form-success',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './oc-form-success.component.html',
  styleUrl: './oc-form-success.component.css'
})
export class OcFormSuccessComponent {
  radicado: string = '123456789';

  constructor(
    private auth: AuthOcService
  ) {}

  goToHome() {
    this.auth.logOut();
  }
}
