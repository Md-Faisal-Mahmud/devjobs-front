export interface JobPostModel {
    Id: string;
    OrganizationID: string;
    Company: CompanyDetails;
    JobTitle: string | null;
    NumberOfVacancies: number;
    PublishedOn: string;
    JobNature: string | null;
    ExperienceMin: number;
    ExperienceMax: number | null;
    Gender: number | null;
    AgeMin: number | null;
    AgeMax: number | null;
    JobLocation: string | null;
    SalaryMin: number | null;
    SalaryMax: number | null;
    JobDescription: string | null;
    EducationalRequirements: string | null;
    ExperienceRequirements: string | null;
    AdditionalJobRequirements: string | null;
    OtherBenefits: string | null;
    Source: string;
    CreatedOn: string;
    Analysis: Analysis[];
  }
  
  export interface CompanyDetails {
    Id: string;
    Name: string | null;
    Website: string | null;
    Address: string | null;
    BusinessType: string | null;
  }
  
  export interface Analysis {
    Id: string;
    Post: any; // Replace 'any'
    JobPostID: string;
    JobTrack: number;
    Experience: number;
    Technologies: Technology[];
  }
  
  export interface Technology {
    Id: string;
    Name: string | null;
  }

  export enum JobTrack {
    NotSet,
    DotNet,
    Java,
    PHP,
    Cpp,
    iOS,
    Android,
    Ruby,
    Network,
    Graphic,
    SystemAdmin,
    DBA,
    Python,
    Perl,
    Other,
    SQA,
    UX
  }
  
  export enum Experience {
    NotSet,
    Intern,
    EntryLevel,
    MidLevel,
    TechLead,
    CLevel
  }
  
  export interface ExperienceLevel {
  }

  export interface JobTrackAnalysis{
  }