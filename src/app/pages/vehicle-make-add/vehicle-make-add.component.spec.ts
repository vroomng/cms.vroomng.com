import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMakeAddComponent } from './vehicle-make-add.component';

describe('VehicleMakeAddComponent', () => {
  let component: VehicleMakeAddComponent;
  let fixture: ComponentFixture<VehicleMakeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMakeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMakeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
