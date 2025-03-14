import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { JobProvider } from './context/JobContext';
import Navigation from './components/Navigation';
import JobList from './components/JobList';
import SearchFilters from './components/SearchFilters';
import MobileFilters from './components/MobileFilters';
import JobForm from './components/JobForm';
import ActiveFilters from './components/ActiveFilters';

function HomePage() {
  return (
    <>
      <SearchFilters />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>
        <ActiveFilters />
        <div className="mb-12">
          <JobList />
        </div>
        <MobileFilters />
      </div>
    </>
  );
}

function App() {
  return (
    <JobProvider>
      <Router basename="/whitehans-assignment">
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/post-job"
              element={
                <div className="max-w-7xl mx-auto px-4 py-8">
                  <JobForm />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;
