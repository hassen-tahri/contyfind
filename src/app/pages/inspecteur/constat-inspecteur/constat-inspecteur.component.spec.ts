import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatInspecteurComponent } from './constat-inspecteur.component';

describe('ConstatInspecteurComponent', () => {
  let component: ConstatInspecteurComponent;
  let fixture: ComponentFixture<ConstatInspecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatInspecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatInspecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
