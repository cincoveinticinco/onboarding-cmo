import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input() label: string | undefined;
  @Input() description: string | undefined;
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }
}
