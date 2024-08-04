import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsRiderComponent } from './ratings-rider.component';

describe('RatingsRiderComponent', () => {
  let component: RatingsRiderComponent;
  let fixture: ComponentFixture<RatingsRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsRiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
