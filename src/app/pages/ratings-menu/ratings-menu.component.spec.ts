import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsMenuComponent } from './ratings-menu.component';

describe('RatingsMenuComponent', () => {
  let component: RatingsMenuComponent;
  let fixture: ComponentFixture<RatingsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
