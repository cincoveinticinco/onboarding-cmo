import { Component, OnInit } from '@angular/core';
import { InputTokenComponent } from '../../components/atoms/input-token/input-token.component';
import { FormsModule } from '@angular/forms';
import { CrewService } from '../../services/crew.service';
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
  crewCastEmail: string = '';
  crewCastEmailSecret: string = '';
  token: string = '';
  crewId: any = null;
  loading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private _cS: CrewService, 
    private route: ActivatedRoute, 
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe((params: any) => {
      this.crewId = params.id;
      this.loadData();  
    }));
  }

  loadData() {
    this.loading = true;
    this.subs.push(this._cS.getCrewEmail(this.crewId).subscribe({
      next: (data: any) => {
        this.crewCastEmail = data.crew || null;
        this.loading = false;
      }
    }));
  }

  requestToken() {

  }

  generateToken(){
    this.loading = true;
    this.error = '';
    this.subs.push(this.auth.generateCrewToken(this.crewCastEmail).subscribe((data:any) => {
      this.crewCastEmailSecret = data.email;
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
    this.subs.push(this.auth.loginCrew(this.crewCastEmail, this.token, this.crewId).subscribe((data:any) => {
      if(data.error){
        this.error = data.msg;
        this.loading = false;
        return;
      }
      this.loading = false;
      this.router.navigate(['complete-form', this.crewId]);
    }));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
