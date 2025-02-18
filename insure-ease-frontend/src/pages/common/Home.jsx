import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPolicies } from "../../slices/policySlice"; // Import action

const Home = () => {
  const dispatch = useDispatch();
  const { policies } = useSelector((state) => state.policies); // Access Redux store
  useEffect(() => {
    if (!policies || policies.length === 0) {
      dispatch(fetchPolicies());
    }
  }, [dispatch, policies]);

  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {policies.slice(0, 4).map((policy, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={policy.id}
            >
              <div className="d-flex justify-content-center position-relative">
                <img
                  src={policy.image}
                  className="d-block img-fluid w-75 rounded"
                  alt={policy.name}
                />
                <div className="carousel-caption d-none d-md-block bg-primary text-white rounded p-2">
                  <h5>Secure Your Future with {policy.name}</h5>
                  <p>{policy.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      <div className="text-center my-5">
        <h1 className="fw-bold text-primary">
          Find the Best Insurance Plan for You
        </h1>
        <p className="lead text-muted">
          Compare different insurance plans and get a personalized quote.
        </p>
        <Link to="/insurance-options" className="btn btn-primary btn-lg">
          Get a Quote
        </Link>
      </div>

      <div className="container text-center">
        <h2 className="mb-4 fw-bold text-primary">
          Explore Our Insurance Plans
        </h2>
        <div className="row g-4">
          {policies.map((policy) => (
            <div className="col-12 col-sm-6 col-md-3" key={policy.id}>
              <div className="card h-100 shadow-sm border-0 rounded overflow-hidden position-relative">
                <img
                  src={policy.image}
                  className="card-img-top p-3 img-fluid"
                  alt={policy.name}
                />
                <div className="card-body bg-light">
                  <h5 className="card-title text-primary">{policy.name}</h5>
                  <Link
                    to={`/policy/${policy.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5 py-5 text-center bg-primary text-white rounded">
        <h2 className="fw-bold">Why Choose Us?</h2>
        <p className="fs-5">
          We provide affordable and reliable insurance solutions tailored to
          your needs.
        </p>
        <Link
          to="/insurance-options"
          className="btn btn-light text-primary fw-bold"
        >
          Explore Plans
        </Link>
      </div>
    </div>
  );
};

export default Home;
