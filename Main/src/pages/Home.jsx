import React from 'react';
import CalculatorCard from '../components/CalculatorCard';

function Home() {
  const categories = [
    { title: 'Financial Calculators', path: '/calculator/financial', desc: 'Mortgage, Loan, Investment, etc.' },
    { title: 'Fitness & Health', path: '/calculator/fitness', desc: 'BMI, Calorie, BMR, etc.' },
    { title: 'Math Calculators', path: '/calculator/math', desc: 'Scientific, Fraction, Percentage, etc.' },
    { title: 'Other Calculators', path: '/calculator/other', desc: 'Age, Date, Time, etc.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <CalculatorCard key={cat.title} title={cat.title} path={cat.path} description={cat.desc} />
      ))}
    </div>
  );
}

export default Home;