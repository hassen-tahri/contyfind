import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DommageComponent } from './dommage.component';

describe('DommageComponent', () => {
  let component: DommageComponent;
  let fixture: ComponentFixture<DommageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DommageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DommageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
