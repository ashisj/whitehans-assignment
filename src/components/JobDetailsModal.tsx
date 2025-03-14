import { Job } from '../types';

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export default function JobDetailsModal({ job, isOpen, onClose, onApply }: JobDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Company</h3>
              <p>{job.company}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Location</h3>
              <p>{job.location}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Type</h3>
              <p>{job.type}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Salary</h3>
              <p>{job.salary}</p>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700">Skills Required</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold text-gray-700">Description</h3>
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Requirements</h3>
              <p className="whitespace-pre-line">{job.requirements}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={onApply}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 