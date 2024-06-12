import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

@Component({
  selector: 'app-datos-salud',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    CheckboxInputComponent,
    SelectInputComponent
  ],
  templateUrl: './datos-salud.component.html',
  styleUrl: './datos-salud.component.css'
})
export class DatosSaludComponent {
  @Input() form: FormGroup | undefined;
  @Input() lists: any = {};
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  showDescription(controlName: string): '0' | '1' {
    return this.getControl(controlName).value
  }
  
  getRiskPercentage() {
    let risk_level = this.getControl('risk_level')
    if(risk_level.value) {
      let percentage = this.lists?.riskLevels.find((item: any) => item.id === risk_level.value)?.risk_percentage
      return percentage
    }
  }
}
