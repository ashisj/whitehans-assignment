import { useJobs } from '../context/JobContext';

export default function ActiveFilters() {
  const { 
    localSearch, 
    setLocalSearch, 
    localLocation, 
    setLocalLocation,
    jobType,
    setJobType 
  } = useJobs();

  const removeFilter = (type: 'search' | 'location' | 'type') => {
    switch(type) {
      case 'search':
        setLocalSearch('');
        break;
      case 'location':
        setLocalLocation('');
        break;
      case 'type':
        setJobType('');
        break;
    }
  };

  if (!localSearch && !localLocation && !jobType) return null;

  return (
    <div className="md:hidden px-4 py-2 mb-4">
      <div className="flex flex-wrap gap-2">
        {localSearch && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            <span>Search: {localSearch}</span>
            <button
              onClick={() => removeFilter('search')}
              className="ml-2 text-blue-600"
            >
              ×
            </button>
          </div>
        )}
        {localLocation && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            <span>Location: {localLocation}</span>
            <button
              onClick={() => removeFilter('location')}
              className="ml-2 text-blue-600"
            >
              ×
            </button>
          </div>
        )}
        {jobType && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            <span>Type: {jobType}</span>
            <button
              onClick={() => removeFilter('type')}
              className="ml-2 text-blue-600"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 