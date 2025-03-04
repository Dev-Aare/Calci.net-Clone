import React from 'react';
import { useParams } from 'react-router-dom';
import AgeCalculator from '../components/calculators/AgeCalculator';
import FinancialCalculators from '../components/calculators/FinancialCalculators';
import FitnessCalculators from '../components/calculators/FitnessCalculators';
import MathCalculators from '../components/calculators/MathCalculators';

function CalculatorPage() {
  const { type } = useParams();

  const renderCalculator = () => {
    switch (type) {
      case 'financial':
        return <FinancialCalculators />;
      case 'fitness':
        return <FitnessCalculators />;
      case 'math':
        return <MathCalculators />;
      case 'other':
        return <AgeCalculator />;
      default:
        return <div>Calculator not found</div>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Calculators</h1>
      {renderCalculator()}
    </div>
  );
}

export default CalculatorPage;