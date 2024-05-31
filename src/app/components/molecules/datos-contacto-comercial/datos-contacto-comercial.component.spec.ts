import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContactoComercialComponent } from './datos-contacto-comercial.component';

describe('DatosContactoComercialComponent', () => {
  let component: DatosContactoComercialComponent;
  let fixture: ComponentFixture<DatosContactoComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContactoComercialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosContactoComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
