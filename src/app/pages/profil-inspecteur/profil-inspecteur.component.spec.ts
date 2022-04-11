import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilInspecteurComponent } from './profil-inspecteur.component';

describe('ProfilInspecteurComponent', () => {
  let component: ProfilInspecteurComponent;
  let fixture: ComponentFixture<ProfilInspecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilInspecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilInspecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
