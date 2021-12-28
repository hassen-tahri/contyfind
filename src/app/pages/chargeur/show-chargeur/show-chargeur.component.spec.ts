import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChargeurComponent } from './show-chargeur.component';

describe('ShowChargeurComponent', () => {
  let component: ShowChargeurComponent;
  let fixture: ComponentFixture<ShowChargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowChargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
