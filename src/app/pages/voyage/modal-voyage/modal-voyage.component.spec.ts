import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVoyageComponent } from './modal-voyage.component';

describe('ModalVoyageComponent', () => {
  let component: ModalVoyageComponent;
  let fixture: ComponentFixture<ModalVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
