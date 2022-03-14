import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBateauComponent } from './show-bateau.component';

describe('ShowBateauComponent', () => {
  let component: ShowBateauComponent;
  let fixture: ComponentFixture<ShowBateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBateauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
