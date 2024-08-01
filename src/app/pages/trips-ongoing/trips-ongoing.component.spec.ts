import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsOngoingComponent } from './trips-ongoing.component';

describe('TripsOngoingComponent', () => {
  let component: TripsOngoingComponent;
  let fixture: ComponentFixture<TripsOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsOngoingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
