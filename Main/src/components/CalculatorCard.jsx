import React from 'react';
import { Link } from 'react-router-dom';

function CalculatorCard({ title, path, description }) {
  return (
    <Link to={path} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </Link>
  );
}

export default CalculatorCard;