import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVoyageComponent } from './show-voyage.component';

describe('ShowVoyageComponent', () => {
  let component: ShowVoyageComponent;
  let fixture: ComponentFixture<ShowVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
