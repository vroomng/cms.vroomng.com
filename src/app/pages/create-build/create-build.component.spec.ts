import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildComponent } from './create-build.component';

describe('CreateBuildComponent', () => {
  let component: CreateBuildComponent;
  let fixture: ComponentFixture<CreateBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
