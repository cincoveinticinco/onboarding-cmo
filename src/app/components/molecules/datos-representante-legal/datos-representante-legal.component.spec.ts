import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRepresentanteLegalComponent } from './datos-representante-legal.component';

describe('DatosRepresentanteLegalComponent', () => {
  let component: DatosRepresentanteLegalComponent;
  let fixture: ComponentFixture<DatosRepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosRepresentanteLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosRepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
