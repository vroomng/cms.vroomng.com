import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCanceledComponent } from './trips-canceled.component';

describe('TripsCanceledComponent', () => {
  let component: TripsCanceledComponent;
  let fixture: ComponentFixture<TripsCanceledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsCanceledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
