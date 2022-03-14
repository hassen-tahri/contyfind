import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBateauComponent } from './modal-bateau.component';

describe('ModalBateauComponent', () => {
  let component: ModalBateauComponent;
  let fixture: ComponentFixture<ModalBateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBateauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
