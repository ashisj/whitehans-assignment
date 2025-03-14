import { useState } from 'react';
import { Job } from '../types';
import { getTimeAgo } from '../utils/dateUtils';
import JobDetailsModal from './JobDetailsModal';
import JobApplicationModal from './JobApplicationModal';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const timeAgo = getTimeAgo(job.postedDate);
  const isNew = timeAgo === 'new';

  const handleApply = async (applicationData: JobApplication) => {
    try {
      console.log('Submitting application:', applicationData);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
        {isNew && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            New
          </div>
        )}
        
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
        <div className="mt-2 text-gray-600">
          <p className="font-semibold">{job.company}</p>
          <p>{job.location}</p>
          <p className="mt-2">{job.type}</p>
          <p className="mt-2 font-semibold">{job.salary}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {isNew ? 'Posted today' : `Posted ${timeAgo}`}
          </p>
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>

      <JobDetailsModal
        job={job}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onApply={() => {
          setIsDetailsOpen(false);
          setIsApplicationOpen(true);
        }}
      />

      <JobApplicationModal
        job={job}
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        onSubmit={handleApply}
      />
    </>
  );
} 