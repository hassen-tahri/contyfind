import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDommageComponent } from './modal-dommage.component';

describe('ModalDommageComponent', () => {
  let component: ModalDommageComponent;
  let fixture: ComponentFixture<ModalDommageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDommageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDommageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
