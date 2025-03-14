import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobFormData } from '../types';
import { useJobs } from '../context/JobContext';

export default function JobForm() {
  const { addJob } = useJobs();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    salary: '',
    skills: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(formData);
    setFormData({
      title: '',
      company: '',
      location: '',
      type: '',
      description: '',
      requirements: '',
      salary: '',
      skills: []
    });
    navigate('/');
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Post a New Job</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job Title"
          className="p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Company"
          className="p-2 border rounded"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
        <select
          className="p-2 border rounded"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
          required
        >
          <option value="">Select Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          type="text"
          placeholder="Salary"
          className="p-2 border rounded"
          value={formData.salary}
          onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="p-2 border rounded"
          value={formData.skills.join(', ')}
          onChange={handleSkillsChange}
          required
        />
      </div>
      <textarea
        placeholder="Job Description"
        className="w-full p-2 border rounded"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        required
      />
      <textarea
        placeholder="Requirements"
        className="w-full p-2 border rounded"
        value={formData.requirements}
        onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Post Job
      </button>
    </form>
  );
} 