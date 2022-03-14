import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDommageComponent } from './show-dommage.component';

describe('ShowDommageComponent', () => {
  let component: ShowDommageComponent;
  let fixture: ComponentFixture<ShowDommageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDommageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDommageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
