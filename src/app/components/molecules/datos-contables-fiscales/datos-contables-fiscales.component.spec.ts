import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContablesFiscalesComponent } from './datos-contables-fiscales.component';

describe('DatosContablesFiscalesComponent', () => {
  let component: DatosContablesFiscalesComponent;
  let fixture: ComponentFixture<DatosContablesFiscalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContablesFiscalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosContablesFiscalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
