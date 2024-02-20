import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogDetailsService } from '../../../services/log-details.service';
import { ILogModel } from '../../../model/ILogModel';
import { DatePipe } from '@angular/common';
import { DatetimeHelper } from '../../../../_core/helpers/datetime.helper';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.css'
})
export class LogDetailsComponent implements OnInit {
  logId: string = '';
  logDetails: ILogModel | undefined;

  constructor(private route: ActivatedRoute, private logDetaildServie: LogDetailsService){
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => 
      this.logId = params.get('id') ?? '');
      this.logDetaildServie.getLogDetailsById(this.logId).subscribe(data => {
        this.logDetails = data;
      });
  }
}
