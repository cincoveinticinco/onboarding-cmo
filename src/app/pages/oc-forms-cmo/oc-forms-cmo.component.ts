import { Component } from '@angular/core';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { AuthOcService } from '../../services/auth-oc.service';

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [PanelButtonsComponent],
  templateUrl: './oc-forms-cmo.component.html',
  styleUrl: './oc-forms-cmo.component.css'
})
export class OcFormsCmoComponent {
  constructor( private auth: AuthOcService ) {

  }

  ngOnInit() {
    this.auth.getSession().then((isLoggedIn: any) => {
      if (!isLoggedIn) {
        this.auth.logOut();
      }
    });
  }
  saveForm() {
    console.log('Form saved');
  }
}
