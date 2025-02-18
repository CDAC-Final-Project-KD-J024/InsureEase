import { Link } from "react-router-dom";
import healthImage from "../../assets/images/health.png";

const HealthInsurance = () => {
  return (
    <div className="container my-5">
      {/* Banner Section */}
      <div className="text-center mb-4">
        <img
          src={healthImage}
          alt="Health Insurance - Secure your family's future"
          className="img-fluid rounded shadow-sm w-75 w-md-50"
        />
        <h2 className="mt-3 text-primary fw-bold">Health Insurance Plans</h2>
        <p className="lead text-muted">
          Secure your family&apos;s health with our comprehensive insurance
          plans.
        </p>
      </div>

      {/* Features Section */}
      <div className="row g-4">
        {[
          {
            title: "Affordable Plans",
            desc: "Get coverage at the best prices available.",
          },
          {
            title: "Cashless Treatment",
            desc: "Access top hospitals without upfront payments.",
          },
          {
            title: "24/7 Support",
            desc: "We are here for you anytime, anywhere.",
          },
        ].map((feature, index) => (
          <div key={index} className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-3">
              <div className="card-body text-center">
                <h5 className="fw-bold text-primary">{feature.title}</h5>
                <p className="text-muted">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center my-5">
        <h4 className="fw-bold text-primary">
          Get Your Personalized Quote Today!
        </h4>
        <p className="text-muted">
          Use our calculator to estimate your health insurance premium.
        </p>
        <Link
          to="/health-insurance-calculator"
          className="btn btn-primary px-4 py-2 fw-bold"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
};

export default HealthInsurance;
