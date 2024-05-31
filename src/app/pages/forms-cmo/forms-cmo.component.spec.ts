import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCmoComponent } from './forms-cmo.component';

describe('FormsCmoComponent', () => {
  let component: FormsCmoComponent;
  let fixture: ComponentFixture<FormsCmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsCmoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsCmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
