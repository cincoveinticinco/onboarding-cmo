import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosFacturaElectronicaComponent } from './datos-factura-electronica.component';

describe('DatosFacturaElectronicaComponent', () => {
  let component: DatosFacturaElectronicaComponent;
  let fixture: ComponentFixture<DatosFacturaElectronicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosFacturaElectronicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosFacturaElectronicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
