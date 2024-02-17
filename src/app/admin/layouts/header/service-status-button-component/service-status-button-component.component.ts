import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkerserviceStatusService } from '../../../services/workerservice-status.service';


@Component({selector: 'app-service-status-button',
template: `
  <div class="relative inline-block">
    <button
      type="button"
      [class]="isWorkerServiceRunning ? 'text-xl text-light rounded-full w-5 h-5 transition bg-green-500' : 'text-xl text-light rounded-full w-5 h-5 transition bg-red-500'"
    ></button>
  </div>
`,
standalone: true
})
export class ServiceStatusButtonComponent implements OnInit, OnDestroy {
  isWorkerServiceRunning: boolean = false;

  private intervalId: any;

  constructor(private workerservice: WorkerserviceStatusService) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.checkServiceStatus();
    }, 60000);

    this.checkServiceStatus();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  checkServiceStatus() {
    this.workerservice.checkServiceStatus().subscribe((data) => {
      if (data.status === 'running') {
        this.isWorkerServiceRunning = true;
      } else if (data.status === 'stopped') {
        this.isWorkerServiceRunning = false;
      }
    });
  }
}
