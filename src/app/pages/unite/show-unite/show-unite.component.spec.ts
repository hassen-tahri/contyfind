import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUniteComponent } from './show-unite.component';

describe('ShowUniteComponent', () => {
  let component: ShowUniteComponent;
  let fixture: ComponentFixture<ShowUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
