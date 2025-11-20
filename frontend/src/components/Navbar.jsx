import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-600">BlogApp</Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
          
          {user ? (
            <>
              <Link to="/create" className="text-gray-700 hover:text-purple-600">Create Post</Link>
              <span className="text-gray-700">Hello, {user.name}</span>
              <button onClick={logout} className="text-gray-700 hover:text-purple-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
              <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;