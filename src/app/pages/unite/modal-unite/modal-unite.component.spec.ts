import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUniteComponent } from './modal-unite.component';

describe('ModalUniteComponent', () => {
  let component: ModalUniteComponent;
  let fixture: ComponentFixture<ModalUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
