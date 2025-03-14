import { useState } from 'react';
import { Job } from '../types';

interface JobApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: JobApplication) => void;
}

interface JobApplication {
  jobId: number;
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
}

export default function JobApplicationModal({ job, isOpen, onClose, onSubmit }: JobApplicationModalProps) {
  const [formData, setFormData] = useState<JobApplication>({
    jobId: job.id,
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Apply for {job.title} at {job.company}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full p-2 border rounded"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                className="mt-1 w-full p-2 border rounded"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  resume: e.target.files ? e.target.files[0] : null 
                }))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                className="mt-1 w-full p-2 border rounded"
                rows={4}
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 