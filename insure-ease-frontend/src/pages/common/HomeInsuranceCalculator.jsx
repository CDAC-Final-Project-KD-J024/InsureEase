import { useState } from "react";

const HomeInsuranceCalculator = () => {
  const [homeValue, setHomeValue] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [locationRisk, setLocationRisk] = useState("low");
  const [premium, setPremium] = useState(null);
  const [error, setError] = useState("");

  const calculatePremium = () => {
    setError("");
    setPremium(null);

    if (
      !homeValue ||
      homeValue <= 0 ||
      !coverageAmount ||
      coverageAmount <= 0
    ) {
      setError(
        "Please enter valid positive values for home value and coverage amount."
      );
      return;
    }

    let basePremium = (coverageAmount * 0.005).toFixed(2);
    let riskFactor =
      locationRisk === "high" ? 1.5 : locationRisk === "medium" ? 1.2 : 1.0;
    let finalPremium = (basePremium * riskFactor).toFixed(2);

    setPremium(finalPremium);
  };

  return (
    <div className="container my-5">
      <h2 className="text-primary fw-bold text-center">
        Home Insurance Calculator
      </h2>
      <p className="lead text-muted text-center">
        Get an estimate of your home insurance premium.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="homeValue">
                Home Value ($)
              </label>
              <input
                type="number"
                id="homeValue"
                className="form-control"
                placeholder="Enter home value"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                min="1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="coverageAmount">
                Coverage Amount ($)
              </label>
              <input
                type="number"
                id="coverageAmount"
                className="form-control"
                placeholder="Enter coverage amount"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                min="1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="locationRisk">
                Location Risk Factor
              </label>
              <select
                id="locationRisk"
                className="form-select"
                value={locationRisk}
                onChange={(e) => setLocationRisk(e.target.value)}
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <button
              className="btn btn-primary w-100"
              onClick={calculatePremium}
            >
              Get Quote
            </button>

            {premium && (
              <div className="alert alert-success mt-4 text-center">
                <h5>
                  Estimated Premium: <strong>${premium} per year</strong>
                </h5>
                <button className="btn btn-success fw-bold mt-2">
                  Proceed to Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInsuranceCalculator;
