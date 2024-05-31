import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContabilidadComponent } from './datos-contabilidad.component';

describe('DatosContabilidadComponent', () => {
  let component: DatosContabilidadComponent;
  let fixture: ComponentFixture<DatosContabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContabilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
