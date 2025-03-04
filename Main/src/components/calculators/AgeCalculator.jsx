import React, { useState } from 'react';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateAgeDetails = () => {
    const today = new Date();
    const birth = new Date(birthDate);

    if (isNaN(birth.getTime()) || birth > today) {
      setResult(null);
      return;
    }

    // Age in different units
    const diffMs = today - birth;
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / 1000 / 60);

    // Next Birthday Countdown
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Zodiac Sign
    const zodiac = getZodiacSign(birth.getDate(), birth.getMonth() + 1);

    // Life Expectancy (Simplified: assumes 80 years average)
    const lifeExpectancy = 80; // Could be customized with gender/country data
    const yearsLeft = lifeExpectancy - years;

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      daysToBirthday,
      zodiac,
      yearsLeft,
    });
  };

  const getZodiacSign = (day, month) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
    return 'Unknown';
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Age Calculator</h2>
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Enter your birth date:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          max={new Date().toISOString().split('T')[0]} // Prevent future dates
        />
        <button
          onClick={calculateAgeDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </div>
      {result && (
        <div className="text-lg space-y-2">
          <p>
            Age in Years: <span className="font-bold">{result.years}</span>
          </p>
          <p>
            Age in Months: <span className="font-bold">{result.months}</span>
          </p>
          <p>
            Age in Days: <span className="font-bold">{result.days}</span>
          </p>
          <p>
            Age in Hours: <span className="font-bold">{result.hours}</span>
          </p>
          <p>
            Age in Minutes: <span className="font-bold">{result.minutes}</span>
          </p>
          <p>
            Days to Next Birthday: <span className="font-bold">{result.daysToBirthday}</span>
          </p>
          <p>
            Zodiac Sign: <span className="font-bold">{result.zodiac}</span>
          </p>
          <p>
            Estimated Years Left (assuming 80):{' '}
            <span className="font-bold">{result.yearsLeft > 0 ? result.yearsLeft : 'N/A'}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default AgeCalculator;