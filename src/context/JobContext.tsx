import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Job, JobFormData, JobContextType } from '../types';
import { jobService } from '../services/jobService';
import { useDebounce } from '../hooks/useDebounce';

const JobContext = createContext<JobContextType | undefined>(undefined);

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

export function JobProvider({ children }: { children: ReactNode }) {
  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  
  // Filter states
  const [localSearch, setLocalSearch] = useState('');
  const [localLocation, setLocalLocation] = useState('');
  const [jobType, setJobType] = useState('');

  // Debounced values
  const debouncedSearch = useDebounce(localSearch, DEBOUNCE_DELAY);
  const debouncedLocation = useDebounce(localLocation, DEBOUNCE_DELAY);

  // Combined filters
  const filters = {
    search: debouncedSearch,
    location: debouncedLocation,
    type: jobType
  };

  // Fetch jobs with error handling
  const fetchJobs = async (pageNum: number, useFilters = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = useFilters 
        ? await jobService.searchJobs(filters, pageNum, ITEMS_PER_PAGE)
        : await jobService.fetchJobs(pageNum, ITEMS_PER_PAGE);

      if (pageNum === 1) {
        setJobs(response.jobs);
      } else {
        setJobs(prev => [...prev, ...response.jobs]);
      }
      
      setHasMore(response.hasMore);
      setTotal(response.total);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasFilters = !!(debouncedSearch || debouncedLocation || jobType);
    setJobs([]);
    setPage(1);
    fetchJobs(1, hasFilters);
  }, [debouncedSearch, debouncedLocation, jobType]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    const nextPage = page + 1;
    const hasFilters = !!(debouncedSearch || debouncedLocation || jobType);
    await fetchJobs(nextPage, hasFilters);
    setPage(nextPage);
  }, [page, loading, hasMore, debouncedSearch, debouncedLocation, jobType]);

  const addJob = useCallback((jobData: JobFormData) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now(),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
    setTotal(prev => prev + 1);
  }, []);

  const contextValue = {
    jobs,
    loading,
    error,
    localSearch,
    setLocalSearch,
    localLocation,
    setLocalLocation,
    jobType,
    setJobType,
    addJob,
    hasMore,
    loadMore,
    total
  };

  return (
    <JobContext.Provider value={contextValue}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
} 