import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostDetailsService } from '../../services/job-post-details.service';
import { Experience, JobPostModel, JobTrack } from '../../model/job-post-model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit{
  jobId: string = '';
  jobDetails: JobPostModel | undefined;
  educationalRequirements: string[] = [];
  experienceRequirements: string[] = [];
  additionalJobRequirements: string[] = [];
  jobDescription: string[] = [];
  otherBenefits: string[] = [];

  experienceLevelsAnalysis: string[] = [];
  jobTracksAnalysis: string[] = [];
  jobTechnologiesAnalysis: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private JobPostService: JobPostDetailsService,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      
      this.jobId = params.get('id') ?? '';
      this.JobPostService.getJobPostDetails(this.jobId).subscribe(data => { 
        this.jobDetails = data;
        this.educationalRequirements = this.prepareEducationalRequirements();
        this.experienceRequirements = this.prepareExperienceRequirements();
        this.additionalJobRequirements = this.prepareAdditionalJobRequirements();
        this.jobDescription = this.prepareJobDescription();
        this.otherBenefits = this.prepareOtherBenefits();
        this.prepareExperienceLevelAnalysis();
        this.prepareJobTrackAnalysis();
        this.prepareJobTechnologiesAnalysis();
      });
    });
  }

  prepareSalary(){
    if (this.jobDetails?.SalaryMin != null && this.jobDetails?.SalaryMax != null){
      return `TK. ${this.jobDetails?.SalaryMin} to ${this.jobDetails?.SalaryMax} (Monthly)`
    }
    else if (this.jobDetails?.SalaryMin != null && this.jobDetails?.SalaryMax == null){
      return `TK. ${this.jobDetails?.SalaryMin} (Monthly)`
    }
    else if (this.jobDetails?.SalaryMin == null && this.jobDetails?.SalaryMax != null){
      return `TK. ${this.jobDetails?.SalaryMax} (Monthly)`
    }
    else{
      return `Negotiable`
    } 
  }

  prepareAge(){
    if (this.jobDetails?.AgeMin != null && this.jobDetails?.AgeMax != null){
      return `${this.jobDetails?.AgeMin} to ${this.jobDetails?.AgeMax} years`
    }
    else if (this.jobDetails?.AgeMin != null && this.jobDetails?.AgeMax == null){
      return `At least ${this.jobDetails?.AgeMin} years`
    }
    else if (this.jobDetails?.AgeMin == null && this.jobDetails?.AgeMax != null){
      return `upto ${this.jobDetails?.AgeMax} years`
    }
    else{
      return `Not specific`
    } 
  }

  prepareExperience(){
    if (this.jobDetails?.ExperienceMin != null && this.jobDetails?.ExperienceMax != null){
      return `${this.jobDetails?.ExperienceMin} to ${this.jobDetails?.ExperienceMax} years`
    }
    else if (this.jobDetails?.ExperienceMin != null && this.jobDetails?.ExperienceMax == null){
      return `At least ${this.jobDetails?.ExperienceMin} years`
    }
    else if (this.jobDetails?.ExperienceMin == null && this.jobDetails?.ExperienceMax != null){
      return `At most ${this.jobDetails?.ExperienceMax}`
    }
    else{
      return `--`
    } 
  }

  prepareDate(){
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.jobDetails?.PublishedOn, 'MMM d y');
    return `${formattedDate}`;
  }

  prepareDateCreatedOn(){
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.jobDetails?.CreatedOn, 'MMM d y');
    return `${formattedDate}`;
  }

  prepareJobLocation() {
    return this.jobDetails?.JobLocation?.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  prepareEducationalRequirements(): string[]{
    const educationRequirements = this.jobDetails?.EducationalRequirements?.split('\n') || [];
    return educationRequirements;
  }

  prepareExperienceRequirements(): string[]{
    const experienceRequirements = this.jobDetails?.ExperienceRequirements?.split('\n') || [];
    return experienceRequirements;
  }

  prepareAdditionalJobRequirements(): string[]{
    const additionalJobRequirements = this.jobDetails?.AdditionalJobRequirements?.split('\n') || [];
    return additionalJobRequirements;
  }

  prepareJobDescription(): string[]{
    const jobDescription = this.jobDetails?.JobDescription?.split('\n') || [];
    return jobDescription;
  }

  prepareOtherBenefits(): string[]{
    const otherBenefits = this.jobDetails?.OtherBenefits?.split('\n') || [];
    return otherBenefits;
  }

  prepareGender(){
    if(this.jobDetails?.Gender == null)
      return `Both males and females`;
    else if(this.jobDetails?.Gender == 0)
      return `Only male`;
    else
      return 'Only female';
  }

  prepareExperienceLevelAnalysis(){
    if (this.jobDetails?.Analysis) {
      for (const analysis of this.jobDetails.Analysis) {
        this.experienceLevelsAnalysis?.push(Experience[analysis.Experience]);
        break;
      }
    }
  }

  prepareJobTrackAnalysis(){
    if (this.jobDetails?.Analysis) {
      for (const analysis of this.jobDetails.Analysis) {
        this.jobTracksAnalysis?.push(JobTrack[analysis.JobTrack]);
      }
    }
  }

  prepareJobTechnologiesAnalysis(){
    if (this.jobDetails?.Analysis) {
      for (const analysis of this.jobDetails.Analysis) {
        for (const technology of analysis.Technologies){
          if (technology?.Name != null) {
            const formattedTechnology = technology.Name.charAt(0).toUpperCase() + technology.Name.slice(1);
            if (!this.jobTechnologiesAnalysis?.includes(formattedTechnology)) {
              this.jobTechnologiesAnalysis?.push(formattedTechnology);
            }
          } 
          else {
          }
        }
      }
    }
  }

  handleCompanyWebsiteClick() {
    const companyWebsite = this.jobDetails?.Company?.Website;
    if (companyWebsite) {
      window.open(companyWebsite, '_blank'); // Open in a new tab
    }
  }
}
