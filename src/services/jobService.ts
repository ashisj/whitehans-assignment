import { Job } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jobService = {
  async fetchJobsData(): Promise<Job[]> {
    try {
      const response = await fetch('/whitehans-assignment/data/jobs.json');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs data:', error);
      return [];
    }
  },

  async fetchJobs(page: number, limit: number = 10): Promise<{
    jobs: Job[];
    hasMore: boolean;
    total: number;
  }> {
    await delay(800);

    const jobsData = await this.fetchJobsData();
    const start = (page - 1) * limit;
    const end = start + limit;
    const jobs = jobsData.slice(start, end);
    
    return {
      jobs,
      hasMore: end < jobsData.length,
      total: jobsData.length
    };
  },

  async searchJobs(filters: {
    search: string;
    location: string;
    type: string;
  }, page: number, limit: number = 10): Promise<{
    jobs: Job[];
    hasMore: boolean;
    total: number;
  }> {
    await delay(800);

    const jobsData = await this.fetchJobsData();
    let filteredJobs = [...jobsData];

    if (filters.search?.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        (job.skills && job.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm)
        ))
      );
    }

    if (filters.location?.trim()) {
      const locationTerm = filters.location.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationTerm)
      );
    }

    if (filters.type?.trim()) {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === filters.type.toLowerCase().trim()
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedJobs = filteredJobs.slice(start, end);

    return {
      jobs: paginatedJobs,
      hasMore: end < filteredJobs.length,
      total: filteredJobs.length
    };
  }
}; 