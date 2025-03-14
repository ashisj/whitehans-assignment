import jobsData from '../../public/data/jobs.json';
import { Job } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jobService = {
  async fetchJobs(page: number, limit: number = 10): Promise<{
    jobs: Job[];
    hasMore: boolean;
    total: number;
  }> {
    await delay(800);

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

    let filteredJobs = [...jobsData];

    // Search in title, company, and description
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

    // Filter by location
    if (filters.location?.trim()) {
      const locationTerm = filters.location.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationTerm)
      );
    }

    // Filter by job type
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