export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary: string;
  skills: string[];
}

export interface Job extends JobFormData {
  id: number;
  postedDate: string;
}

export interface JobApplication {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
}

export interface FilterState {
  search: string;
  location: string;
  type: string;
}

export interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  localSearch: string;
  setLocalSearch: (search: string) => void;
  localLocation: string;
  setLocalLocation: (location: string) => void;
  jobType: string;
  setJobType: (type: string) => void;
  addJob: (job: JobFormData) => void;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  total: number;
}

export interface JobSearchResponse {
  jobs: Job[];
  hasMore: boolean;
  total: number;
}