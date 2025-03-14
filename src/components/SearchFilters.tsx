import { useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchFilters() {
  const { 
    localSearch, 
    setLocalSearch, 
    localLocation, 
    setLocalLocation,
    jobType,
    setJobType
  } = useJobs();
  
  const debouncedSearch = useDebounce(localSearch);
  const debouncedLocation = useDebounce(localLocation);

  useEffect(() => {
    setLocalSearch(debouncedSearch);
    setLocalLocation(debouncedLocation);
  }, [debouncedSearch, debouncedLocation, setLocalSearch, setLocalLocation]);

  return (
    <div className="hidden md:block sticky top-0 bg-white z-40 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="flex-1 p-2 border rounded-lg"
            value={localSearch || ''}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="Location..."
            className="flex-1 p-2 border rounded-lg"
            value={localLocation || ''}
            onChange={(e) => setLocalLocation(e.target.value)}
          />
          
          <select
            className="flex-1 p-2 border rounded-lg"
            value={jobType || ''}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>
    </div>
  );
} 