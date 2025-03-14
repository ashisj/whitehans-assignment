import { useState } from 'react';
import { useJobs } from '../context/JobContext';

export default function MobileFilters() {
  const { 
    localSearch, 
    setLocalSearch, 
    localLocation, 
    setLocalLocation,
    jobType,
    setJobType
  } = useJobs();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-600"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full p-2 border rounded-lg"
                  value={localSearch || ''}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Location..."
                  className="w-full p-2 border rounded-lg"
                  value={localLocation || ''}
                  onChange={(e) => setLocalLocation(e.target.value)}
                />
              </div>

              <div>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={jobType || ''}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 