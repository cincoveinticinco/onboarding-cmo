import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContactoEmergenciaComponent } from './datos-contacto-emergencia.component';

describe('DatosContactoEmergenciaComponent', () => {
  let component: DatosContactoEmergenciaComponent;
  let fixture: ComponentFixture<DatosContactoEmergenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContactoEmergenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosContactoEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
