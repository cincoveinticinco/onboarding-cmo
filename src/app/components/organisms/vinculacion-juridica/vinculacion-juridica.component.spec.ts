import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculacionJuridicaComponent } from './vinculacion-juridica.component';

describe('VinculacionJuridicaComponent', () => {
  let component: VinculacionJuridicaComponent;
  let fixture: ComponentFixture<VinculacionJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinculacionJuridicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VinculacionJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
