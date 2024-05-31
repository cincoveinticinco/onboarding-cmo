import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContratistaComponent } from './datos-contratista.component';

describe('DatosContratistaComponent', () => {
  let component: DatosContratistaComponent;
  let fixture: ComponentFixture<DatosContratistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContratistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
