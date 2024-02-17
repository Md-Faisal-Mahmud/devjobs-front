import { Component, ViewChild } from '@angular/core';
import { FilterColumn } from '../../../../shared/components/data-table/types/paging.type';
import { Datatable, DatatableAction, DatatableColumn, DisplayType } from '../../../../shared/components/data-table/types/data-table.type';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [NgClass, DataTableComponent],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.css'
})
export class LogListComponent {
  filters: FilterColumn[] = []
  apiUrl: string = "/v1/DbLog"

  dtSetting: Datatable = new Datatable([
    new DatatableColumn('Level', 'level', { width: '15%', align: 'justify-center', display: DisplayType.xs }, false, true),
    new DatatableColumn('Message', 'message', { width: '17%', align: 'justify-center', display: DisplayType.xxl }, false, false, (row) => this.prepareMessage(row)),
    new DatatableColumn('Timestamp', 'timestamp', { width: '18%', align: 'justify-center', display: DisplayType.xs }, false, true),
    new DatatableColumn('Exception', 'exception', { width: '22%', align: 'justify-center', display: DisplayType.xxl }, false, false, (row) => this.prepareException(row)),
    new DatatableColumn('Log Event', 'logEvent', { width: '18%', align: 'justify-center', display: DisplayType.xxl }, false, false, (row) => this.prepareLogEvent(row)),
    new DatatableColumn('Action', 'id', { width: '10%', align: 'justify-center', display: DisplayType.md }, true, false, (row) => this.prepare(row), undefined,
        [
          new DatatableAction({ tittle: 'Details', icon: 'bi bi-info-circle' }, 'info', (x) => this.hitAction(x)),
        ]
    ),
  ], "Logs");

  @ViewChild(DataTableComponent) datatable?: DataTableComponent;
  
  constructor(private router: Router) {}

  hitAction(x: any) {
    if (x && x.id){
      this.router.navigate(['/admin/log-details', x.id]);
    }
  }

  onSearch(filters: FilterColumn[]) {
    this.datatable?.onAdvanceSearch(filters);
  }

  prepareMessage(row: any) {
    if (row.message != null)
    return row.message;
    else
      return 'Unavailable';
  }

  prepare(row: any) {
    return `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${row.status}</span>`
  }

  prepareException(row: any) {
    if (row.exception != null)
    return row.exception ? row.exception.slice(0, 120) + ' . . .' : '';
    else
      return 'Unavailable';
  }

  prepareLogEvent(row: any) {
    if (row.logEvent != null)
    return row.logEvent ? row.logEvent.slice(0, 200) + ' . . .' : '';
    else
      return 'Unavailable';
  }
}
