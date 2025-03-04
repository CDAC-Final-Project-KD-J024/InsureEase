import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import profile from '../../assets/images/profile.avif';
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [preview, setPreview] = useState(user.profilePicture);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();

    for (let key in formData) {
      updatedData.append(key, formData[key]);
    }

    try {
      // await dispatch(updateUser(updatedData)).unwrap();
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Profile</h2>

      <div className="text-center mb-4">
        <img
          src="http://localhost:5000/uploads/profile-pictures/1740510126639.jpg"
          // {preview ? `${import.meta.env.VITE_SERVER_URL}/${preview}` : profile}
          alt="Profile"
          className="rounded-circle border border-primary" 
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control mt-3"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="row g-3">
        {['firstName', 'lastName', 'email', 'phone', 'dob', 'gender', 'address', 'city', 'state', 'country', 'pincode'].map((field) => (
          <div className="col-md-6" key={field}>
            <label htmlFor={field} className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              disabled={!editMode}
              className={`form-control ${!editMode ? 'bg-light' : ''}`}
            />
          </div>
        ))}

        <div className="d-flex justify-content-center gap-3 mt-4">
          {editMode ? (
            <>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="btn btn-success"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;