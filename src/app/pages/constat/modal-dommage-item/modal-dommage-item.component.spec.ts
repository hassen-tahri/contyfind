import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDommageItemComponent } from './modal-dommage-item.component';

describe('ModalDommageItemComponent', () => {
  let component: ModalDommageItemComponent;
  let fixture: ComponentFixture<ModalDommageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDommageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDommageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
