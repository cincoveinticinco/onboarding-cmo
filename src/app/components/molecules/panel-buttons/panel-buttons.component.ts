import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { AuthService } from '../../../services/auth.service';
import { VendorService } from '../../../services/vendor.service';

@Component({
  selector: 'app-panel-buttons',
  standalone: true,
  imports: [
    BlackButtonComponent,
  ],
  templateUrl: './panel-buttons.component.html',
  styleUrl: './panel-buttons.component.css'
})
export class PanelButtonsComponent {
  @Output() saveForm: EventEmitter<any> = new EventEmitter();
  constructor(private auth: AuthService, private _vS: VendorService) {}
  logOut() {
    this.auth.logOut(this._vS.getVendorId());
  }
}
