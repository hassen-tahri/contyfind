import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDommageItemComponent } from './show-dommage-item.component';

describe('ShowDommageItemComponent', () => {
  let component: ShowDommageItemComponent;
  let fixture: ComponentFixture<ShowDommageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDommageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDommageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
