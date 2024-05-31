import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataComponent } from './initial-data.component';

describe('InitialDataComponent', () => {
  let component: InitialDataComponent;
  let fixture: ComponentFixture<InitialDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
