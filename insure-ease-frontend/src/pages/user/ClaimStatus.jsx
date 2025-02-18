import { useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const ClaimStatus = () => {
  const claims = useSelector((state) => state.claim.claims);
  const [search, setSearch] = useState("");

  // Mapping policyId to policy name
  const policyNames = {
    "101": "Car Insurance",
    "102": "Health Insurance",
    "103": "Home Insurance",
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredClaims = claims.filter((claim) =>
    policyNames[claim.policyId]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Claim Status</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search claims..."
          value={search}
          onChange={handleSearch}
        />
        <span className="input-group-text">
          <FaSearch />
        </span>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Policy Name</th>
            <th>Status</th>
            <th>Filed Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim, index) => (
              <tr key={claim.id}>
                <td>{index + 1}</td>
                <td>{policyNames[claim.policyId] || "Unknown Policy"}</td>
                <td>
                  <span
                    className={`badge ${
                      claim.claimStatus === "Approved"
                        ? "bg-success"
                        : claim.claimStatus === "Rejected"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {claim.claimStatus}
                  </span>
                </td>
                <td>{claim.filedDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No claims found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimStatus;
