import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmComponent } from './send-sm.component';

describe('SendSmComponent', () => {
  let component: SendSmComponent;
  let fixture: ComponentFixture<SendSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
