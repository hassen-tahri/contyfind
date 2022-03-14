import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilChargeurComponent } from './profil-chargeur.component';

describe('ProfilChargeurComponent', () => {
  let component: ProfilChargeurComponent;
  let fixture: ComponentFixture<ProfilChargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilChargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilChargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
