import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteUser, handleUpdateUserRole } from "../../slices/adminSlice";
import { toast } from "react-toastify";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select user from Redux store
  const user = useSelector((state) => state.admin.users.find((u) => u.id === id));

  if (!user) return <p className="text-center mt-5">User not found.</p>;

  // Handle role change
  const handleRoleChange = () => {
    const newRole = user.role === "user" ? "admin" : "user";
    dispatch(handleUpdateUserRole(id, newRole));
    toast.success(`User role updated to ${newRole}`);
  };

  // Handle user deletion
  const handleDeleteUserAction = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(handleDeleteUser(id));
      toast.success("User deleted successfully");
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <div className="card p-3">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Role:</strong> 
          <span className={`badge ${user.role === "admin" ? "bg-success" : "bg-primary"} ms-2`}>
            {user.role}
          </span>
        </p>
        <p><strong>Join Date:</strong> {user.createdAt}</p>

        {/* Action Buttons */}
        <div className="mt-4">
          <button className="btn btn-warning me-2" onClick={handleRoleChange}>
            {user.role === "user" ? "Promote to Admin" : "Demote to User"}
          </button>
          <button className="btn btn-danger me-2" onClick={handleDeleteUserAction}>Delete User</button>
          <Link to="/admin/users" className="btn btn-outline-primary">Back to Users</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
