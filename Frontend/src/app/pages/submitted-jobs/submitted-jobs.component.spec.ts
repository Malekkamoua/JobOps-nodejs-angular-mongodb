import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedJobsComponent } from './submitted-jobs.component';

describe('SubmittedJobsComponent', () => {
  let component: SubmittedJobsComponent;
  let fixture: ComponentFixture<SubmittedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
