import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestsMenuComponent } from './quests-menu.component';

describe('QuestsMenuComponent', () => {
  let component: QuestsMenuComponent;
  let fixture: ComponentFixture<QuestsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
