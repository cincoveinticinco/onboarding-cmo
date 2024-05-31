import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionFinancieraComponent } from './informacion-financiera.component';

describe('InformacionFinancieraComponent', () => {
  let component: InformacionFinancieraComponent;
  let fixture: ComponentFixture<InformacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionFinancieraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
