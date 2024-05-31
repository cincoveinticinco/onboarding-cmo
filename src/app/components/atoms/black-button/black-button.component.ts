import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-black-button',
  standalone: true,
  imports: [],
  templateUrl: './black-button.component.html',
  styleUrl: './black-button.component.css'
})
export class BlackButtonComponent {
  @Input() name: string | undefined;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
