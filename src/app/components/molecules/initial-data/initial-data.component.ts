import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-initial-data',
  standalone: true,
  imports: [
    TextInputComponent,
  ],
  templateUrl: './initial-data.component.html',
  styleUrls: ['./initial-data.component.css']
})
export class InitialDataComponent {
  @Input() form: FormGroup | undefined;
  @Output() setFormValue = new EventEmitter<{ controlName: string, value: string }>();

  setValue(controlName: string, value: string) {
    this.setFormValue.emit({ controlName, value });
  }

  getErrors(controlName: string): string | null {
    const control = this.form?.get(controlName);
    const touched = control?.touched;
    if (control?.hasError('required') && touched) {
      return 'Este campo es requerido';
    }
    return null;
  }
}
