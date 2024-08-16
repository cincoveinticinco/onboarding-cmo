import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';

@Component({
  selector: 'app-inf-dependant-certification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    FileboxComponent
  ],
  templateUrl: './inf-dependant-certification.component.html',
  styleUrl: './inf-dependant-certification.component.css'
})
export class InfDependantCertificationComponent {
  @Input() dependantForm!: FormGroup;
  @Input() loading: boolean = false;
  @Input() dependentIndex: number = 0;
  documentTypesOptions: any = [];

  constructor(private ils: InvoiceLodgingService) {}

  ngOnInit() {
    this.scrollToTop();
    this.ils.getDocumentTypes().subscribe((response: any) => {
      this.documentTypesOptions = response;
    });
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  getControl(controlName: string) {
    return this.dependantForm.get(controlName) as FormControl
  }

  getValue(controlName: string) {
    return this.dependantForm.get(controlName)?.value;
  }
}
