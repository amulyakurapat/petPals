import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, PawPrint } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">PetPals</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/adopt" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Heart className="h-5 w-5" />
              <span>Adopt</span>
            </Link>
            <Link to="/rehome" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Rehome a Pet
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;