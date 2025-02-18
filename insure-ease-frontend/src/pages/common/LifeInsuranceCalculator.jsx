import { useState } from "react";
import { Link } from "react-router-dom";

const LifeInsuranceCalculator = () => {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [coverage, setCoverage] = useState(100000);
  const [smoker, setSmoker] = useState(false);
  const [quote, setQuote] = useState(null);

  const calculatePremium = () => {
    let baseRate = 50;
    const parsedAge = parseInt(age, 10);
    const parsedCoverage = parseInt(coverage, 10);

    if (parsedAge > 40) baseRate += 20;
    if (gender === "female") baseRate -= 5;
    if (smoker) baseRate += 30;

    const estimatedPremium = ((parsedCoverage / 10000) * baseRate).toFixed(2);
    setQuote(estimatedPremium);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary text-center fw-bold">Life Insurance Calculator</h2>
      <p className="text-muted text-center">Estimate your monthly insurance premium.</p>

      <div className="card p-4 shadow-sm">
        <fieldset className="mb-4">
          <legend className="fw-bold">Personal Information</legend>

          {/* Age Input */}
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
            />
          </div>

          {/* Gender Selection */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="fw-bold">Insurance Details</legend>

          {/* Coverage Input */}
          <div className="mb-3">
            <label className="form-label">Coverage Amount ($)</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={coverage}
                onChange={(e) => setCoverage(Math.max(50000, e.target.value))}
                step="5000"
                min="50000"
              />
            </div>
          </div>

          {/* Smoker Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="smokerCheckbox"
              checked={smoker}
              onChange={() => setSmoker(!smoker)}
            />
            <label className="form-check-label" htmlFor="smokerCheckbox">Smoker</label>
          </div>
        </fieldset>

        {/* Calculate Button */}
        <button className="btn btn-primary w-100 btn-lg" onClick={calculatePremium}>
          Get Quote
        </button>

        {/* Quote Display */}
        {quote && (
          <div className="alert alert-success mt-4 text-center">
            <h5>Your estimated premium: <strong>${quote}/month</strong></h5>
            <Link to="/register" className="btn btn-outline-primary mt-2">
              Sign Up to Purchase
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeInsuranceCalculator;
