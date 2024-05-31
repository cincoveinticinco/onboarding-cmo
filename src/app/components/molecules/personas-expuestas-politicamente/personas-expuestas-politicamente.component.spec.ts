import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasExpuestasPoliticamenteComponent } from './personas-expuestas-politicamente.component';

describe('PersonasExpuestasPoliticamenteComponent', () => {
  let component: PersonasExpuestasPoliticamenteComponent;
  let fixture: ComponentFixture<PersonasExpuestasPoliticamenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasExpuestasPoliticamenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonasExpuestasPoliticamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
