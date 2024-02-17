import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostCountChartComponent } from './job-post-count-chart.component';

describe('JobPostCountChartComponent', () => {
  let component: JobPostCountChartComponent;
  let fixture: ComponentFixture<JobPostCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPostCountChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
