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
  @Output() getErrorMessage = new EventEmitter<string>();

  setValue(controlName: string, value: string) {
    this.setFormValue.emit({ controlName, value });
  }

  emitErrorMessage(controlName: string) {
    this.getErrorMessage.emit(controlName);
  }
}
