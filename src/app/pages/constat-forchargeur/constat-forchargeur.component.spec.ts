import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatForchargeurComponent } from './constat-forchargeur.component';

describe('ConstatForchargeurComponent', () => {
  let component: ConstatForchargeurComponent;
  let fixture: ComponentFixture<ConstatForchargeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatForchargeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatForchargeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
