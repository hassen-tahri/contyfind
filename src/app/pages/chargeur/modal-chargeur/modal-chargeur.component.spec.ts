import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChargeurComponent } from './modal-chargeur.component';

describe('ModalChargeurComponent', () => {
  let component: ModalChargeurComponent;
  let fixture: ComponentFixture<ModalChargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
