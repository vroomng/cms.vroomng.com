import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSurgeComponent } from './app-surge.component';

describe('AppSurgeComponent', () => {
  let component: AppSurgeComponent;
  let fixture: ComponentFixture<AppSurgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSurgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSurgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
