import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionSagrilaftComponent } from './declaracion-sagrilaft.component';

describe('DeclaracionSagrilaftComponent', () => {
  let component: DeclaracionSagrilaftComponent;
  let fixture: ComponentFixture<DeclaracionSagrilaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaracionSagrilaftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclaracionSagrilaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
