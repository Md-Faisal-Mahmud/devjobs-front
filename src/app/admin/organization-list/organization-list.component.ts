import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FilterColumn, OperatorType } from '../../shared/components/data-table/types/paging.type';
import { Datatable, DatatableAction, DatatableColumn, DisplayType } from '../../shared/components/data-table/types/data-table.type';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgClass, DataTableComponent],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.css',
})

export class OrganizationDataTableComponent {
  filters: FilterColumn[] = []

  apiUrl: string = "/v1/Organizations"

  dtSetting: Datatable = new Datatable([
    new DatatableColumn('Name', 'name', { width: '15%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Website', 'website', { width: '15%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareWebsite(row)),
    new DatatableColumn('Address', 'address', { width: '25%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareAddress(row)),
    new DatatableColumn('Business Type', 'businessType', { width: '45%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareBusinessType(row)),
  ], "Organizations");

  @ViewChild(DataTableComponent) datatable?: DataTableComponent;
  hitAction(x: any) {
  }

  onSearch(filters: FilterColumn[]) {
    this.datatable?.onAdvanceSearch(filters);
  }

  prepareWebsite(row: any){
    if(row.website != null)
      return `<p>${row.website}</p>`;
    else
      return `<p>Unavailable</p>`;
  }

  prepareAddress(row: any){
    if(row.address != null)
      return `<p>${row.address}</p>`;
    else
      return `<p>Unavailable</p>`;
  }

  prepareBusinessType(row: any){
    if(row.businessType != null)
      return `<p>${row.businessType}</p>`;
    else
      return `<p>Unavailable</p>`;
  }

  prepare(row: any) {
    return `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${row.status}</span>`
  }

}
