import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInspecteurComponent } from './modal-inspecteur.component';

describe('ModalInspecteurComponent', () => {
  let component: ModalInspecteurComponent;
  let fixture: ComponentFixture<ModalInspecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInspecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInspecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
