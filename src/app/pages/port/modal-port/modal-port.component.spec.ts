import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPortComponent } from './modal-port.component';

describe('ModalPortComponent', () => {
  let component: ModalPortComponent;
  let fixture: ComponentFixture<ModalPortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
