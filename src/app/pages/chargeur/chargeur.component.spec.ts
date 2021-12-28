import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeurComponent } from './chargeur.component';

describe('ChargeurComponent', () => {
  let component: ChargeurComponent;
  let fixture: ComponentFixture<ChargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
