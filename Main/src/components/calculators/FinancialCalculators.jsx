import React, { useState } from 'react';

function FinancialCalculators() {
  const [activeTab, setActiveTab] = useState('loan'); // Track active calculator

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState('');
  const [loanInterestRate, setLoanInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState(null);

  // Mortgage Calculator State
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageRate, setMortgageRate] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [insurance, setInsurance] = useState('');
  const [mortgageResult, setMortgageResult] = useState(null);

  // Compound Interest Calculator State
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [compoundsPerYear, setCompoundsPerYear] = useState('');
  const [years, setYears] = useState('');
  const [compoundResult, setCompoundResult] = useState(null);

  // Retirement Calculator State
  const [currentSavings, setCurrentSavings] = useState('');
  const [annualContribution, setAnnualContribution] = useState('');
  const [retirementYears, setRetirementYears] = useState('');
  const [retirementRate, setRetirementRate] = useState('');
  const [retirementResult, setRetirementResult] = useState(null);

  // Loan Calculator Logic
  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanInterestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    if (P > 0 && r > 0 && n > 0) {
      const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setLoanResult(payment.toFixed(2));
    } else {
      setLoanResult(null);
    }
  };

  // Mortgage Calculator Logic
  const calculateMortgage = () => {
    const P = parseFloat(mortgageAmount);
    const r = parseFloat(mortgageRate) / 100 / 12;
    const n = parseFloat(mortgageTerm) * 12;
    const tax = parseFloat(propertyTax) / 12 || 0;
    const ins = parseFloat(insurance) / 12 || 0;
    if (P > 0 && r > 0 && n > 0) {
      const principalInterest = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = principalInterest + tax + ins;
      setMortgageResult(totalPayment.toFixed(2));
    } else {
      setMortgageResult(null);
    }
  };

  // Compound Interest Calculator Logic
  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(compoundsPerYear);
    const t = parseFloat(years);
    if (P > 0 && r > 0 && n > 0 && t > 0) {
      const amount = P * Math.pow(1 + r / n, n * t);
      setCompoundResult({
        total: amount.toFixed(2),
        interest: (amount - P).toFixed(2),
      });
    } else {
      setCompoundResult(null);
    }
  };

  // Retirement Calculator Logic
  const calculateRetirement = () => {
    const S = parseFloat(currentSavings);
    const C = parseFloat(annualContribution);
    const r = parseFloat(retirementRate) / 100;
    const t = parseFloat(retirementYears);
    if (S >= 0 && C >= 0 && r > 0 && t > 0) {
      const futureSavings = S * Math.pow(1 + r, t) + C * ((Math.pow(1 + r, t) - 1) / r);
      setRetirementResult(futureSavings.toFixed(2));
    } else {
      setRetirementResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Financial Calculators</h2>
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {[
          { id: 'loan', label: 'Loan' },
          { id: 'mortgage', label: 'Mortgage' },
          { id: 'compound', label: 'Compound Interest' },
          { id: 'retirement', label: 'Retirement' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 ₹ {activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loan Calculator */}
      {activeTab === 'loan' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Loan Amount (₹ ):</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Interest Rate (%):</label>
            <input
              type="number"
              value={loanInterestRate}
              onChange={(e) => setLoanInterestRate(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Loan Term (years):</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={calculateLoan}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          {loanResult && <p className="text-lg">Monthly Payment: ₹ {loanResult}</p>}
        </div>
      )}

      {/* Mortgage Calculator */}
      {activeTab === 'mortgage' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Loan Amount (₹ ):</label>
            <input
              type="number"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Interest Rate (%):</label>
            <input
              type="number"
              value={mortgageRate}
              onChange={(e) => setMortgageRate(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Loan Term (years):</label>
            <input
              type="number"
              value={mortgageTerm}
              onChange={(e) => setMortgageTerm(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Annual Property Tax (₹ ):</label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Annual Insurance (₹ ):</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={calculateMortgage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          {mortgageResult && <p className="text-lg">Monthly Payment: ₹ {mortgageResult}</p>}
        </div>
      )}

      {/* Compound Interest Calculator */}
      {activeTab === 'compound' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Principal Amount (₹ ):</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Annual Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Compounds Per Year:</label>
            <input
              type="number"
              value={compoundsPerYear}
              onChange={(e) => setCompoundsPerYear(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Time (years):</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={calculateCompoundInterest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          {compoundResult && (
            <div className="text-lg">
              <p>Total Amount: ₹ {compoundResult.total}</p>
              <p>Interest Earned: ₹ {compoundResult.interest}</p>
            </div>
          )}
        </div>
      )}

      {/* Retirement Calculator */}
      {activeTab === 'retirement' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Current Savings (₹ ):</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Annual Contribution (₹ ):</label>
            <input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Years Until Retirement:</label>
            <input
              type="number"
              value={retirementYears}
              onChange={(e) => setRetirementYears(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Expected Annual Return (%):</label>
            <input
              type="number"
              value={retirementRate}
              onChange={(e) => setRetirementRate(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={calculateRetirement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          {retirementResult && (
            <p className="text-lg">Retirement Savings: ₹ {retirementResult}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FinancialCalculators;