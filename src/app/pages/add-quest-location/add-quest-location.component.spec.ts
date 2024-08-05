import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestLocationComponent } from './add-quest-location.component';

describe('AddQuestLocationComponent', () => {
  let component: AddQuestLocationComponent;
  let fixture: ComponentFixture<AddQuestLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
