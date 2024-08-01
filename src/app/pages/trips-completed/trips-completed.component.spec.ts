import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCompletedComponent } from './trips-completed.component';

describe('TripsCompletedComponent', () => {
  let component: TripsCompletedComponent;
  let fixture: ComponentFixture<TripsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
