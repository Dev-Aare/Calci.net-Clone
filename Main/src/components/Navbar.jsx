import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Calculator Clone</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/calculator/financial" className="hover:underline">Financial</Link>
          <Link to="/calculator/fitness" className="hover:underline">Fitness</Link>
          <Link to="/calculator/math" className="hover:underline">Math</Link>
          <Link to="/calculator/other" className="hover:underline">Other</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;