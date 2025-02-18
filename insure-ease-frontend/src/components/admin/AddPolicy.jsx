import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPolicy } from "../../slices/policySlice"; // Import the action

const AddPolicy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [policyData, setPolicyData] = useState({
    type: "",
    description: "",
    price: "",
    coverage: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setPolicyData({ ...policyData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!policyData.type) errors.type = "Policy type is required";
    if (!policyData.description) errors.description = "Description is required";
    if (!policyData.price) errors.price = "Price is required";
    if (!policyData.coverage) errors.coverage = "Coverage details are required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addPolicy(policyData)); // Dispatch Redux action
      alert("Policy added successfully!");
      navigate("/admin/policies"); // Redirect to Manage Policies Page
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Policy</h2>
      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          {/* Policy Type */}
          <div className="mb-3">
            <label className="form-label">Policy Type</label>
            <input
              type="text"
              name="type"
              className={`form-control ${errors.type ? "is-invalid" : ""}`}
              value={policyData.type}
              onChange={handleChange}
            />
            {errors.type && <div className="invalid-feedback">{errors.type}</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows="3"
              value={policyData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              value={policyData.price}
              onChange={handleChange}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          {/* Coverage Details */}
          <div className="mb-3">
            <label className="form-label">Coverage Details</label>
            <input
              type="text"
              name="coverage"
              className={`form-control ${errors.coverage ? "is-invalid" : ""}`}
              value={policyData.coverage}
              onChange={handleChange}
            />
            {errors.coverage && <div className="invalid-feedback">{errors.coverage}</div>}
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select name="status" className="form-control" value={policyData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Add Policy</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/policies")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPolicy;