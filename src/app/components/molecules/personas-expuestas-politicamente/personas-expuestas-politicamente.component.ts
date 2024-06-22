import { Component, Input, OnInit } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-personas-expuestas-politicamente',
  standalone: true,
  imports: [
    SubtitleComponent,
    CheckboxInputComponent,
    TextInputComponent,
  ],
  templateUrl: './personas-expuestas-politicamente.component.html',
  styleUrl: './personas-expuestas-politicamente.component.css'
})
export class PersonasExpuestasPoliticamenteComponent implements OnInit {
  @Input() form: FormGroup | undefined;

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  ngOnInit(): void {
    this.validatePepInputs();

    this.getControl('is_pep')?.valueChanges?.subscribe((value) => {
      this.validatePepInputs();
    });
  }

  validatePepInputs() {
    if (this.getControl('is_pep')?.value == '1') {
      this.getControl('pep_start_date')?.enable();
      this.getControl('pep_end_date')?.enable();
      this.getControl('pep_position')?.enable();
      this.getControl('pep_term')?.enable();
    } else {
      this.getControl('pep_start_date')?.disable();
      this.getControl('pep_end_date')?.disable();
      this.getControl('pep_position')?.disable();
      this.getControl('pep_term')?.disable();
    }

    this.form?.updateValueAndValidity();
  }


}
