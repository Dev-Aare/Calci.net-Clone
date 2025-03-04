import React, { useState } from 'react';

function FitnessCalculators() {
  const [activeTab, setActiveTab] = useState('bmi'); // Track active calculator

  // BMI Calculator State
  const [weight, setWeight] = useState(''); // in kg
  const [height, setHeight] = useState(''); // in cm
  const [bmi, setBmi] = useState(null);

  // Calorie Calculator State
  const [calorieWeight, setCalorieWeight] = useState(''); // in kg
  const [calorieHeight, setCalorieHeight] = useState(''); // in cm
  const [calorieAge, setCalorieAge] = useState('');
  const [calorieGender, setCalorieGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calorieResult, setCalorieResult] = useState(null);

  // Body Fat Calculator State
  const [waist, setWaist] = useState(''); // in cm
  const [neck, setNeck] = useState(''); // in cm
  const [bodyFatHeight, setBodyFatHeight] = useState(''); // in cm
  const [bodyFatGender, setBodyFatGender] = useState('male');
  const [bodyFatResult, setBodyFatResult] = useState(null);

  // Ideal Weight Calculator State
  const [idealHeight, setIdealHeight] = useState(''); // in cm
  const [idealGender, setIdealGender] = useState('male');
  const [idealResult, setIdealResult] = useState(null);

  // BMI Calculator Logic
  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters
    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi(null);
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  // Calorie Calculator Logic (Harris-Benedict BMR + Activity)
  const calculateCalories = () => {
    const w = parseFloat(calorieWeight);
    const h = parseFloat(calorieHeight);
    const a = parseFloat(calorieAge);
    if (w > 0 && h > 0 && a > 0) {
      let bmr;
      if (calorieGender === 'male') {
        bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
      } else {
        bmr = 447.593 + 9.247 * w + 3.098 * h - 4.330 * a;
      }
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
      };
      const calories = bmr * activityMultipliers[activityLevel];
      setCalorieResult(calories.toFixed(0));
    } else {
      setCalorieResult(null);
    }
  };

  // Body Fat Calculator Logic (U.S. Navy Method)
  const calculateBodyFat = () => {
    const w = parseFloat(waist); // Waist in cm
    const n = parseFloat(neck); // Neck in cm
    const h = parseFloat(bodyFatHeight); // Height in cm
    if (w > 0 && n > 0 && h > 0) {
      let bodyFat;
      if (bodyFatGender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        // For females, we'd need hip measurement, but simplifying here
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + w - n) + 0.22100 * Math.log10(h)) - 450;
      }
      setBodyFatResult(bodyFat.toFixed(1));
    } else {
      setBodyFatResult(null);
    }
  };

  // Ideal Weight Calculator Logic (Hamwi Formula)
  const calculateIdealWeight = () => {
    const h = parseFloat(idealHeight); // Height in cm
    if (h > 0) {
      const hInches = h / 2.54; // Convert cm to inches
      let idealWeight;
      if (idealGender === 'male') {
        idealWeight = 48 + 2.7 * (hInches - 60); // Base 48 kg for 5 ft, +2.7 kg per inch over
      } else {
        idealWeight = 45.5 + 2.2 * (hInches - 60); // Base 45.5 kg for 5 ft, +2.2 kg per inch over
      }
      const minWeight = idealWeight * 0.9; // ±10% range
      const maxWeight = idealWeight * 1.1;
      setIdealResult({ min: minWeight.toFixed(1), max: maxWeight.toFixed(1) });
    } else {
      setIdealResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Fitness & Health Calculators</h2>
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {[
          { id: 'bmi', label: 'BMI' },
          { id: 'calorie', label: 'Calorie' },
          { id: 'bodyfat', label: 'Body Fat' },
          { id: 'idealweight', label: 'Ideal Weight' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* BMI Calculator */}
      {activeTab === 'bmi' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={calculateBMI}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate BMI
          </button>
          {bmi && (
            <div className="text-lg">
              <p>Your BMI: <span className="font-bold">{bmi}</span></p>
              <p>Category: <span className="font-bold">{getBMICategory(bmi)}</span></p>
            </div>
          )}
        </div>
      )}

      {/* Calorie Calculator */}
      {activeTab === 'calorie' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Weight (kg):</label>
            <input
              type="number"
              value={calorieWeight}
              onChange={(e) => setCalorieWeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Height (cm):</label>
            <input
              type="number"
              value={calorieHeight}
              onChange={(e) => setCalorieHeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Age:</label>
            <input
              type="number"
              value={calorieAge}
              onChange={(e) => setCalorieAge(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Gender:</label>
            <select
              value={calorieGender}
              onChange={(e) => setCalorieGender(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700">Activity Level:</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (hard exercise daily)</option>
            </select>
          </div>
          <button
            onClick={calculateCalories}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate Calories
          </button>
          {calorieResult && (
            <p className="text-lg">Daily Calorie Needs: <span className="font-bold">{calorieResult}</span> kcal</p>
          )}
        </div>
      )}

      {/* Body Fat Calculator */}
      {activeTab === 'bodyfat' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Waist Circumference (cm):</label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Neck Circumference (cm):</label>
            <input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Height (cm):</label>
            <input
              type="number"
              value={bodyFatHeight}
              onChange={(e) => setBodyFatHeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Gender:</label>
            <select
              value={bodyFatGender}
              onChange={(e) => setBodyFatGender(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={calculateBodyFat}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate Body Fat
          </button>
          {bodyFatResult && (
            <p className="text-lg">Body Fat Percentage: <span className="font-bold">{bodyFatResult}</span>%</p>
          )}
        </div>
      )}

      {/* Ideal Weight Calculator */}
      {activeTab === 'idealweight' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-700">Height (cm):</label>
            <input
              type="number"
              value={idealHeight}
              onChange={(e) => setIdealHeight(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Gender:</label>
            <select
              value={idealGender}
              onChange={(e) => setIdealGender(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={calculateIdealWeight}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate Ideal Weight
          </button>
          {idealResult && (
            <p className="text-lg">
              Ideal Weight Range: <span className="font-bold">{idealResult.min} - {idealResult.max}</span> kg
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FitnessCalculators;