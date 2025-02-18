import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ClaimDetails = () => {
  const { id } = useParams();
  const claim = useSelector((state) =>
    state.claim.claims.find((c) => c.id.toString() === id)
  );

  if (!claim) {
    return <h2 className="text-center mt-4">Claim not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>Claim Details</h2>
      <div className="card p-3">
        <p>
          <strong>Policy:</strong> {claim.policyId}
        </p>
        <p>
          <strong>Status:</strong> {claim.claimStatus}
        </p>
        <p>
          <strong>Filed Date:</strong> {claim.filedDate}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {claim.description || "No details provided"}
        </p>
      </div>
    </div>
  );
};

export default ClaimDetails;
