import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatVoyageComponent } from './constat-voyage.component';

describe('ConstatVoyageComponent', () => {
  let component: ConstatVoyageComponent;
  let fixture: ComponentFixture<ConstatVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatVoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
