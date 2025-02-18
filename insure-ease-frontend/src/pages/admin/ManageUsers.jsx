import { useSelector, useDispatch } from "react-redux";
import { promoteUser, demoteUser, deleteUser } from "../../slices/adminSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const [search, setSearch] = useState("");

  
  const filteredUsers = users.filter((user) =>
  user.name &&  user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleRoleChange = (user) => {
    if (user.role === "User") {
      dispatch(promoteUser(user.id));
      toast.success(${user.name} is now an Admin);
    } else {
      dispatch(demoteUser(user.id));
      toast.info(${user.name} is now a User);
    }
  };

  
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.error(`User ID ${id} has been deleted`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Users</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={badge ${user.role === "Admin" ? "bg-success" : "bg-primary"}}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <Link to={/admin/user/${user.id}} className="btn btn-info btn-sm me-2">
                    View
                  </Link>
                  <button
                    className={btn ${user.role === "User" ? "btn-warning" : "btn-secondary"} btn-sm me-2}
                    onClick={() => handleRoleChange(user)}
                  >
                    {user.role === "User" ? "Promote to Admin" : "Demote to User"}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;