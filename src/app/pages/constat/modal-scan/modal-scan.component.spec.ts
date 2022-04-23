import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalScanComponent } from './modal-scan.component';

describe('ModalScanComponent', () => {
  let component: ModalScanComponent;
  let fixture: ComponentFixture<ModalScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
