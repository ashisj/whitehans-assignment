import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* WhiteHans Logo and Home Link */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/WhiteHans.png" alt="WhiteHans Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">WhiteHans</span>
          </Link>

          {/* Post Job Link */}
          <Link 
            to="/post-job" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span className="text-white">Post Job</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 