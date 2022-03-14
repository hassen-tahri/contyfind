import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPortComponent } from './show-port.component';

describe('ShowPortComponent', () => {
  let component: ShowPortComponent;
  let fixture: ComponentFixture<ShowPortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
