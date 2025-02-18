import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchUserPoliciesRequest,
  fetchUserPoliciesSuccess,
  fetchUserPoliciesFailure,
} from "../../slices/userPolicySlice";

const PolicyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { userPolicies, loading, error } = useSelector((state) => state.userPolicies);
  
  // Find the policy in Redux store
  const policy = userPolicies.find((p) => p.id === id);

  useEffect(() => {
    if (!policy) {
      dispatch(fetchUserPoliciesRequest());
      
      // Simulate API call to fetch policy details
      setTimeout(() => {
        fetch(`/api/userPolicies/${id}`)  // Assuming an API call
          .then((res) => res.json())
          .then((data) => {
            dispatch(fetchUserPoliciesSuccess([data]));  // Store only the required policy
          })
          .catch((err) => {
            dispatch(fetchUserPoliciesFailure("Failed to load policy details."));
            console.error("Error fetching policy:", err);
          });
      }, 1000);
    }
  }, [dispatch, policy, id]);

  const handleDownload = () => {
    if (!policy?.document) {
      toast.error("No policy document available for download.");
      return;
    }

    toast.success("Downloading policy document...");
    setTimeout(() => {
      window.open(`/downloads/${policy.document}`, "_blank");
    }, 1000);
  };

  if (loading) return <p>Loading policy details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!policy) return <p className="text-warning">Policy not found.</p>;

  return (
    <div className="container mt-4">
      <h2>Policy Details</h2>
      <div className="card p-3">
        <h4>{policy.name}</h4>
        <p><strong>Type:</strong> {policy.type}</p>
        <p><strong>Coverage:</strong> {policy.coverage}</p>
        <p><strong>Premium:</strong> {policy.premium}</p>
        <p><strong>Duration:</strong> {policy.duration}</p>
        <p><strong>Start Date:</strong> {policy.startDate}</p>
        <p><strong>End Date:</strong> {policy.endDate}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={policy.status === "Active" ? "text-success" : "text-danger"}>
            {policy.status}
          </span>
        </p>

        <button className="btn btn-primary mt-2" onClick={handleDownload}>
          Download Policy Document
        </button>

        {policy.status === "Active" && (
          <button className="btn btn-warning mt-2 ms-2">Renew Policy</button>
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;
