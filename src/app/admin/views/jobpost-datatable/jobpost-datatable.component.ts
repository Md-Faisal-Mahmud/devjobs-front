import { DatePipe, NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { Datatable, DatatableAction, DatatableColumn, DisplayType } from '../../../shared/components/data-table/types/data-table.type';
import { FilterColumn } from '../../../shared/components/data-table/types/paging.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobpost-data-table',
  standalone: true,
  imports: [NgClass, DataTableComponent],
  templateUrl: './jobpost-datatable.component.html',
  styleUrl: './jobpost-datatable.component.css',
})

export class AdminJobPostDataTableComponent {
  filters: FilterColumn[] = []
  apiUrl: string = "/v1/JobPost"

  dtSetting: Datatable = new Datatable([
    new DatatableColumn('Job Title', 'jobTitle', { width: '10%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Vacancy', 'numberOfVacancies', { width: '2%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Job Nature', 'jobNature', { width: '10%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Job Title', 'jobTitle', { width: '10%', align: 'justify-start', display: DisplayType.xs }, false, true),
    new DatatableColumn('Published', 'publishedOn', { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareDate(row)),
    new DatatableColumn('Gender', 'gender', { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareGender(row)),
    new DatatableColumn('Age', 'ageMin', { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareAge(row)),
    new DatatableColumn('Salary', 'salaryMin', { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareSalary(row)),
    new DatatableColumn('Experience', "experienceRequirements", { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareExperience(row)),
    new DatatableColumn('Education', "educationalRequirements", { width: '10%', align: 'justify-start', display: DisplayType.xxl }, false, false, (row) => this.prepareEducation(row)),
    new DatatableColumn('Action', 'id', { width: '18%', align: 'justify-center', display: DisplayType.md }, true, false, (row) => this.prepare(row), undefined,
        [
          new DatatableAction({ tittle: 'Details', icon: 'bi bi-info-circle' }, 'info', (x) => this.hitAction(x)),
        ]
    ),
  ], "Job Posts");

  @ViewChild(DataTableComponent) datatable?: DataTableComponent;
  
  constructor(private router: Router) {}

  hitAction(x: any) {
    if (x && x.id){
      this.router.navigate(['/admin/job-details', x.id]);
    }
  }

  onSearch(filters: FilterColumn[]) {
    this.datatable?.onAdvanceSearch(filters);
  }

  prepare(row: any) {
    return `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${row.status}</span>`
  }

  prepareDate(row: any){
    const publishDate = new Date(row.publishedOn);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(publishDate, 'MMM d y');
    return `<p>${formattedDate}</p>`;
  }

  prepareGender(row: any){
    if(row.gender == null)
      return `<p>Both</p>`;
    else if(row.gender == 0)
      return `<p>Only Male</p>`;
    else
      return '<p>Only Female</p>';
  }

  prepareAge(row: any){
    if (row.ageMin != null && row.ageMax != null){
      return `<p>${row.ageMin} to ${row.ageMax}</p>`
    }
    else if (row.ageMin != null && row.ageMax == null){
      return `<p>At least ${row.ageMin}</p>`
    }
    else if (row.ageMin == null && row.ageMax != null){
      return `<p>At most ${row.ageMax}</p>`
    }
    else{
      return `<p>Not specific</p>`
    } 
  }

  prepareSalary(row: any){
    if (row.salaryMin != null && row.salaryMax != null){
      return `<p>TK. ${row.salaryMin} to ${row.salaryMax} (Monthly)</p>`
    }
    else if (row.salaryMin != null && row.salaryMax == null){
      return `<p>TK. ${row.salaryMin} (Monthly)</p>`
    }
    else if (row.salaryMin == null && row.salaryMax != null){
      return `<p>TK. ${row.salaryMax} (Monthly)</p>`
    }
    else{
      return `<p>Negotiable</p>`
    } 
  }

  prepareExperience(row: any){
    if (row.experienceRequirements != null)
    return row.experienceRequirements ? row.experienceRequirements.slice(0, 30) + '...' : '';
    else
      return 'Unavailable';
  }

  prepareEducation(row: any){
    if (row.educationalRequirements != null)
      return row.educationalRequirements ? row.educationalRequirements.slice(0, 40) + '...' : '';
    else
      return 'Unavailable';
  }
}
