import { Link } from "react-router-dom";
import HomeInsuranceImage from "../../assets/images/house.png";

const HomeInsurance = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center text-center mb-4">
        <div className="col-md-8">
          <img
            src={HomeInsuranceImage}
            alt="Illustration of a secured home representing home insurance coverage"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: "100%" }}
          />
          <h2 className="mt-3 text-primary fw-bold">
            Protect Your Home & Property
          </h2>
          <p className="lead text-muted">
            Secure your home against unforeseen damages with our comprehensive
            coverage plans.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {[
          {
            title: "Fire & Theft Coverage",
            description: "Stay protected from major disasters and losses.",
          },
          {
            title: "Affordable Premiums",
            description: "Choose from budget-friendly plans tailored to you.",
          },
          {
            title: "24/7 Claim Assistance",
            description: "Quick and hassle-free claim processing anytime.",
          },
        ].map((feature, index) => (
          <div className="col-md-4" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="fw-bold text-primary">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-5">
        <h2 className="fw-bold text-primary">
          Get Your Home Insurance Quote Today!
        </h2>
        <p className="text-muted">
          Use our calculator to estimate your home insurance premium.
        </p>
        <Link
          to="/home-insurance-calculator"
          className="btn btn-primary px-4 py-2 fw-bold"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
};

export default HomeInsurance;
