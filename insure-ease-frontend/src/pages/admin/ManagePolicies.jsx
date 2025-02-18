import { useSelector, useDispatch } from "react-redux";
import { deletePolicy } from "../../slices/policySlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const ManagePolicies = () => {
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.policies.policies);
  const [search, setSearch] = useState("");

 
  const filteredPolicies = policies.filter((policy) =>
    policy.type.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleDelete = (id) => {
    dispatch(deletePolicy(id));

   
    toast.error(`Policy ID ${id} deleted successfully`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Manage Policies</h2>

      {/* Search Bar & Add New Policy Button */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/admin/add-policy" className="btn btn-success">Add New Policy</Link>
      </div>

      {/* Policies Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Price</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.type}</td>
                  <td>
                    <span className={badge ${policy.status === "Active" ? "bg-success" : "bg-danger"}}>
                      {policy.status}
                    </span>
                  </td>
                  <td>{policy.price}</td>
                  <td>{policy.date}</td>
                  <td>
                    <Link to={/admin/edit-policy/${policy.id}} className="btn btn-warning btn-sm me-2">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(policy.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No policies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePolicies;