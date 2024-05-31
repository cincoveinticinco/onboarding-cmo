import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTesoreriaComponent } from './datos-tesoreria.component';

describe('DatosTesoreriaComponent', () => {
  let component: DatosTesoreriaComponent;
  let fixture: ComponentFixture<DatosTesoreriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosTesoreriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosTesoreriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
