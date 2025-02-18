import { Link } from "react-router-dom";
import CarInsurance from "../../assets/images/car.png";
import HealthInsurance from "../../assets/images/health.png";
import HouseInsurance from "../../assets/images/house.png";
import LifeInsurance from "../../assets/images/life.png";

const insurancePlans = [
  {
    img: CarInsurance,
    title: "Car Insurance",
    path: "/insurance/car",
    desc: "Protect your vehicle with comprehensive coverage.",
  },
  {
    img: LifeInsurance,
    title: "Life Insurance",
    path: "/insurance/life",
    desc: "Secure your family's future with our life insurance plans.",
  },
  {
    img: HealthInsurance,
    title: "Health Insurance",
    path: "/insurance/health",
    desc: "Get the best medical coverage for you and your family.",
  },
  {
    img: HouseInsurance,
    title: "Home Insurance",
    path: "/insurance/home",
    desc: "Protect your home from unexpected damages.",
  },
];

const InsuranceOptions = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold text-primary">
        Choose Your Insurance Plan
      </h2>
      <p className="text-center text-muted">
        Select an insurance type to view details and get a personalized quote.
      </p>

      <div className="row g-4">
        {insurancePlans.map(({ img, title, path, desc }, index) => (
          <div className="col-12 col-sm-6 col-md-3" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded overflow-hidden">
              <img
                src={img}
                className="card-img-top p-3 img-fluid"
                alt={`${title} Illustration`}
                style={{ height: "150px", objectFit: "contain" }}
              />
              <div className="card-body bg-light text-center">
                <h5 className="card-title fw-bold text-primary">{title}</h5>
                <p className="text-muted">{desc}</p>
                <Link to={path} className="btn btn-primary w-100">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceOptions;
