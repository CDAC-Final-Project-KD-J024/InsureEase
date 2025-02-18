import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarInsuranceCalculator = () => {
  const [carValue, setCarValue] = useState("");
  const [age, setAge] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [estimatedPremium, setEstimatedPremium] = useState(null);

  const calculatePremium = (e) => {
    e.preventDefault();

    
    const carPrice = parseFloat(carValue);
    const driverAge = parseInt(age);
    const experience = parseInt(drivingExperience);

 
    if (isNaN(carPrice) || isNaN(driverAge) || isNaN(experience)) {
      toast.error("Please enter valid numbers!");
      return;
    }
    if (carPrice <= 0 || driverAge <= 0 || experience < 0) {
      toast.error("Values must be greater than zero!");
      return;
    }
    if (experience > driverAge) {
      toast.error("Experience cannot be greater than age!");
      return;
    }

    
    let basePremium = carPrice * 0.03; 
    let experienceFactor = experience > 5 ? 0.9 : 1.2; 
    let ageFactor = driverAge < 25 ? 1.3 : 1; 

    let finalPremium = basePremium * experienceFactor * ageFactor;
    setEstimatedPremium(finalPremium.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold">Car Insurance Calculator</h2>
      <p className="text-muted text-center">
        Enter your details to get an estimated insurance premium.
      </p>

      <form className="mt-4" onSubmit={calculatePremium}>
        <div className="mb-3">
          <label className="form-label fw-bold">Car Value ($)</label>
          <input
            type="number"
            className="form-control"
            value={carValue}
            onChange={(e) => setCarValue(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Your Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Years of Driving Experience</label>
          <input
            type="number"
            className="form-control"
            value={drivingExperience}
            onChange={(e) => setDrivingExperience(e.target.value)}
            min="0"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Calculate Premium
        </button>
      </form>

      {estimatedPremium && (
        <div className="mt-4 text-center">
          <h4 className="text-success">Estimated Premium: ${estimatedPremium} / year</h4>
          <button className="btn btn-success fw-bold mt-2">Proceed to Purchase</button>
        </div>
      )}
    </div>
  );
};

export default CarInsuranceCalculator;