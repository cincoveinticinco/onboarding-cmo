import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

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
  @Input() dependantForm: any;
  @Input() dependentIndex: number = 0;

  ngOnInit() {
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  getControl(controlName: string) {
    return this.dependantForm?.get(controlName);
  }

  getValue(controlName: string) {
    return this.dependantForm?.get(controlName)?.value;
  }
}
