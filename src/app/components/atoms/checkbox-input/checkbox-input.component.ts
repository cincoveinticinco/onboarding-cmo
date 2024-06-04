import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent {
  @Input() label: string | undefined;
  @Input() control: FormControl = new FormControl();
  @Input() description: string = '';

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }
}
