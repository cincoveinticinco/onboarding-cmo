import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personas-expuestas-politicamente',
  standalone: true,
  imports: [
    SubtitleComponent,
    CheckboxInputComponent
  ],
  templateUrl: './personas-expuestas-politicamente.component.html',
  styleUrl: './personas-expuestas-politicamente.component.css'
})
export class PersonasExpuestasPoliticamenteComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
