import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { JobPostCountService } from '../../services/job-post-count.service';
import { JobPostCountModel } from '../../model/job-post-count-model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NgIf } from '@angular/common';

Chart.register(...registerables)
@Component({
  selector: 'app-job-post-count-chart',
  standalone: true,
  imports: [NgIf, SpinnerComponent],
  templateUrl: './job-post-count-chart.component.html',
  styleUrl: './job-post-count-chart.component.css'
})
export class JobPostCountChartComponent implements OnInit{
  isLoadingChartData:boolean = true
  isChartDataLoadingFailed:boolean = false

  constructor(private http: HttpClient, private jobPostCountService: JobPostCountService){}
  
 data: JobPostCountModel[] = [];
 async getDataFromApi() {
      this.jobPostCountService.fetchJobPostCountByDays().subscribe({
        next: value => {
          this.data= value; 
          this.isLoadingChartData=false;
          this.isChartDataLoadingFailed=false;
          this.showChart()
        },
        error: err => {
          this.isChartDataLoadingFailed=true; 
          this.isLoadingChartData=false; 
        },
      });
  }
  showChart(){
    var myChart = new Chart(
      "dayWiseJobPost",
      {
        type: 'line',
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 0,
              to: 0.2,
              loop: false
            }
          },
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: this.data.map(row => row.date),
          datasets: [
            {
              label: 'Job Posted',
              borderColor: '#3445db',
              borderWidth: 2,
              data: this.data.map(row => row.jobCount),
            }
          ]
        }
      }
    );
  }
  async ngOnInit(): Promise<void> {
    await this.getDataFromApi();
  }
}
