import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  @Input() options: any[] = [];
  @Input() description: string = '';
  @Input() label: string = '';
}
