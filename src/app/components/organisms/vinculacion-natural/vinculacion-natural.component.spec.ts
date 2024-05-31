import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculacionNaturalComponent } from './vinculacion-natural.component';

describe('VinculacionNaturalComponent', () => {
  let component: VinculacionNaturalComponent;
  let fixture: ComponentFixture<VinculacionNaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinculacionNaturalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VinculacionNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
