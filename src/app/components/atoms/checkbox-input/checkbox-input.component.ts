import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent {
  @Input() label: string | undefined;
}
