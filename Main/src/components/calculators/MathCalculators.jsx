import React, { useState } from 'react';

function MathCalculators() {
  const [display, setDisplay] = useState('0'); // Current input or result
  const [expression, setExpression] = useState(''); // Full expression being built
  const [isRadians, setIsRadians] = useState(true); // Radians vs Degrees toggle

  // Handle number and decimal input
  const handleButtonClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };

  // Handle operations (+, -, *, /)
  const handleOperation = (op) => {
    // If the last character is an operator, replace it with the new one
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }
    setDisplay(''); // Clear display for next number input
  };

  // Handle scientific functions (sqrt, sin, cos, etc.)
  const handleFunction = (func) => {
    try {
      const num = parseFloat(display);
      let result;
      switch (func) {
        case 'sqrt':
          result = Math.sqrt(num);
          break;
        case 'sin':
          result = isRadians ? Math.sin(num) : Math.sin((num * Math.PI) / 180);
          break;
        case 'cos':
          result = isRadians ? Math.cos(num) : Math.cos((num * Math.PI) / 180);
          break;
        case 'tan':
          result = isRadians ? Math.tan(num) : Math.tan((num * Math.PI) / 180);
          break;
        case 'log':
          result = Math.log10(num);
          break;
        case 'ln':
          result = Math.log(num);
          break;
        case 'pow2':
          result = Math.pow(num, 2);
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  // Handle constants (π, e)
  const handleConstant = (constant) => {
    const value = constant === 'pi' ? Math.PI : Math.E;
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  // Calculate the result of the expression
  const calculateResult = () => {
    try {
      const result = eval(expression); // Using eval for simplicity; consider mathjs for production
      setDisplay(result.toString());
      setExpression(result.toString()); // Allow further operations on the result
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  // Clear everything
  const clearDisplay = () => {
    setDisplay('0');
    setExpression('');
  };

  // Toggle between radians and degrees
  const toggleAngleUnit = () => {
    setIsRadians(!isRadians);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">Scientific Calculator</h2>
      <div className="bg-gray-200 p-4 rounded-lg text-right text-2xl font-mono">
        {expression || display} {/* Show full expression or current input */}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {/* Numbers */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-gray-300 hover:bg-gray-400 text-black p-3 rounded transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick('.')}
          className="bg-gray-300 hover:bg-gray-400 text-black p-3 rounded transition"
        >
          .
        </button>
        {/* Operations */}
        {['+', '-', '*', '/'].map((op) => (
          <button
            key={op}
            onClick={() => handleOperation(op)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition"
          >
            {op}
          </button>
        ))}
        {/* Functions */}
        {['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'pow2'].map((func) => (
          <button
            key={func}
            onClick={() => handleFunction(func)}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded transition"
          >
            {func === 'pow2' ? 'x²' : func}
          </button>
        ))}
        {/* Constants */}
        {['pi', 'e'].map((constVal) => (
          <button
            key={constVal}
            onClick={() => handleConstant(constVal)}
            className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded transition"
          >
            {constVal === 'pi' ? 'π' : 'e'}
          </button>
        ))}
        {/* Controls */}
        <button
          onClick={calculateResult}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded transition col-span-2"
        >
          =
        </button>
        <button
          onClick={clearDisplay}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded transition col-span-2"
        >
          Clear
        </button>
        <button
          onClick={toggleAngleUnit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded transition"
        >
          {isRadians ? 'Rad' : 'Deg'}
        </button>
      </div>
    </div>
  );
}

export default MathCalculators;