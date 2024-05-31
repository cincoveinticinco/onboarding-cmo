import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaDiligenciaFormularioComponent } from './persona-diligencia-formulario.component';

describe('PersonaDiligenciaFormularioComponent', () => {
  let component: PersonaDiligenciaFormularioComponent;
  let fixture: ComponentFixture<PersonaDiligenciaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaDiligenciaFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaDiligenciaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
