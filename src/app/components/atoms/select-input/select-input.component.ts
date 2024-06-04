import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  @Input() options: any[] = [];
  @Input() description: string = '';
  @Input() label: string = '';

  @Input() control: FormControl = new FormControl();

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }
}
