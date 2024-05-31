import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionPepComponent } from './declaracion-pep.component';

describe('DeclaracionPepComponent', () => {
  let component: DeclaracionPepComponent;
  let fixture: ComponentFixture<DeclaracionPepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaracionPepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclaracionPepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
