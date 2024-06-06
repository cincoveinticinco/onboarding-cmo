import { Component, OnInit } from '@angular/core';
import { InputTokenComponent } from '../../components/atoms/input-token/input-token.component';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { BlackButtonComponent } from '../../components/atoms/black-button/black-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, InputTokenComponent, FormsModule, BlackButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  error: string = '';
  view: string = 'home';
  vendorEmail: string = '';
  vendorEmailSecret: string = '';
  token: string = '';
  vendorId: any = null;
  loading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private _vS: VendorService, 
    private route: ActivatedRoute, 
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe((params: any) => {
      this.vendorId = params.id;
      this.loadData();  
    }));
  }

  loadData() {
    this.loading = true;
    this.subs.push(this._vS.getVendorEmail(this.vendorId).subscribe({
      next: (data: any) => {
        this.vendorEmail = data.vendor || null;
        this.loading = false;
      }
    }));
  }

  requestToken() {

  }

  generateToken(){
    this.loading = true;
    this.error = '';
    this.subs.push(this.auth.generateVendorToken(this.vendorEmail).subscribe((data:any) => {
      this.vendorEmailSecret = data.email;
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }
      this.loading = false;
    }));
  }

  setView(view: string) {
    this.view = view;
  }

  sendToken(){
    this.loading = true;
    this.subs.push(this.auth.loginVendor(this.vendorEmail, this.token, this.vendorId).subscribe((data:any) => {
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }
      this.loading = false;
      this.router.navigate(['complete-form', this.vendorId]);
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
