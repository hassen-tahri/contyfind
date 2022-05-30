import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoPagesComponent } from './tuto-pages.component';

describe('TutoPagesComponent', () => {
  let component: TutoPagesComponent;
  let fixture: ComponentFixture<TutoPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
