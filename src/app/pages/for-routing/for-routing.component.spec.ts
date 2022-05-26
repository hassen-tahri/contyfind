import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForRoutingComponent } from './for-routing.component';

describe('ForRoutingComponent', () => {
  let component: ForRoutingComponent;
  let fixture: ComponentFixture<ForRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForRoutingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
