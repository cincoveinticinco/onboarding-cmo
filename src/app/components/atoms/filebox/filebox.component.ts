import { Component, Input, Optional, Self } from '@angular/core';
import { DragAndDropFileDirective } from '../../../shared/directives/drag-and-drop-file.directive'
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-filebox',
  standalone: true,
  imports: [DragAndDropFileDirective, DialogComponent, ReactiveFormsModule],
  templateUrl: './filebox.component.html',
  styleUrl: './filebox.component.css'
})
export class FileboxComponent implements ControlValueAccessor, Validator {

  @Input() onlyPdf = false;
  @Input() control: FormControl = new FormControl();

  onChange = (value: string) => {}
  onTouched = () => {}  
  value: any;
  disabled: boolean = false;
  fileName: any;
  view: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl != null){
      this.ngControl.valueAccessor = this;
    }
  }

  onFileChange(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files
    if(files && files.length > 0){
      const file = files[0];
     
      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
      this.control.setValue(this.value);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null
  }

  onDragFileChange(files: any){
    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
    }
  }

  clearFile(){
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value)
  }

  writeValue(value: any): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeView(newView: string = '') {
    this.view = newView;
  }
}
