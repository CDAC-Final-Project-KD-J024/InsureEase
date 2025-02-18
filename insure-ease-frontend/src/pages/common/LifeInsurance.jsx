import { Link } from "react-router-dom";
import LifeInsuranceImg from "../../assets/images/life.png";

const LifeInsurance = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold">Life Insurance</h2>
      <p className="text-muted text-center">
        Secure your family&apos;s future with our comprehensive life insurance plans.
      </p>

      <div className="row mt-4 align-items-center">
        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={LifeInsuranceImg}
            alt="Illustration of Life Insurance Benefits"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: "80%" }}
          />
        </div>

        {/* Benefits Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h4 className="fw-bold">Why Choose Our Life Insurance?</h4>
          <ul className="list-group list-group-flush mt-3" role="list">
            <li className="list-group-item text-muted">✅ Affordable Premiums</li>
            <li className="list-group-item text-muted">✅ Financial Security for Your Loved Ones</li>
            <li className="list-group-item text-muted">✅ Flexible Coverage Options</li>
            <li className="list-group-item text-muted">✅ Tax Benefits & Savings</li>
            <li className="list-group-item text-muted">✅ Hassle-Free Claim Process</li>
          </ul>

          <Link to="/life-insurance-calculator" className="btn btn-primary btn-lg mt-4 fw-bold">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LifeInsurance;
