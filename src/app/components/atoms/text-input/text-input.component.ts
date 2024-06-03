import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input() label: string | undefined;
  @Input() description: string | undefined;
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
  @Output() setFormValue = new EventEmitter<{controlName: string, value: string}>();

  setValue(event: any) {
    this.setFormValue.emit({ controlName: this.controlName, value: event.target.value });
  }
}
