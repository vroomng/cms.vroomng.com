import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewQuestComponent } from './admin-view-quest.component';

describe('AdminViewQuestComponent', () => {
  let component: AdminViewQuestComponent;
  let fixture: ComponentFixture<AdminViewQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
