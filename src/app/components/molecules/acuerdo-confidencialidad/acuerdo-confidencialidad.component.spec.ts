import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuerdoConfidencialidadComponent } from './acuerdo-confidencialidad.component';

describe('AcuerdoConfidencialidadComponent', () => {
  let component: AcuerdoConfidencialidadComponent;
  let fixture: ComponentFixture<AcuerdoConfidencialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuerdoConfidencialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcuerdoConfidencialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
