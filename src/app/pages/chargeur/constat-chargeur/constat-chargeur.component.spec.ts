import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatChargeurComponent } from './constat-chargeur.component';

describe('ConstatChargeurComponent', () => {
  let component: ConstatChargeurComponent;
  let fixture: ComponentFixture<ConstatChargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatChargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatChargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
