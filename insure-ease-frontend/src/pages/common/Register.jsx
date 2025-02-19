import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileImg from '../../assets/images/profile.avif';
import { useDispatch } from 'react-redux';
import { handleRegister } from "../../slices/authSlice";

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [imagePreview, setImagePreview] = useState(ProfileImg);

  // Email Validation
// Ensures a valid email format with an "@" symbol and a domain.
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Phone Number Validation
// Ensures the phone number contains only digits and is between 10 to 15 characters long.
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

// Pincode Validation
// Ensures the pincode contains only digits and is between 5 to 10 characters long.
  const validatePincode = (pincode) => /^\d{5,10}$/.test(pincode);
// Password Validation
// Ensures the password:
// - Has at least one uppercase letter
// - Has at least one digit
// - Has at least one special character (@$!%*?&)
// - Is at least 6 characters long
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB!");
        return;
      }
      setFormData({ ...formData, profilePicture: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {profilePicture, firstName, lastName, email, password, confirmPassword, phone, dob, gender, address, city, state, country, pincode } = formData;
    

    if (!firstName || !lastName || !email || !password || !confirmPassword || !dob || !gender || !phone || !address || !city || !state || !country || !pincode) {
      toast.error("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters, contain an uppercase letter, a number, and a special character!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Invalid phone number!");
      return;
    }
    if (!validatePincode(pincode)) {
      toast.error("Invalid pincode! Must be 5-10 digits.");
      return;
    }
    
    const form=new FormData();
    form.append("profilePicture",profilePicture);
    
    form.append("firstName",firstName);
    form.append("lastName",lastName);
    form.append("email",email);
    form.append("password",password);
    form.append("dob",dob);
    form.append("gender",gender);
    form.append("phone",phone);
    form.append("address",address);
    form.append("city",city);
    form.append("state",state);
    form.append("country",country);
    form.append("pincode",pincode);
    dispatch(handleRegister(form));
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", paddingTop: "15px" }}>
      <div className="card p-3 shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="text-center mb-2">
          <label htmlFor="profilePicture" className="d-block position-relative">
            <input type="file" id="profilePicture" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            <img src={imagePreview} alt="Profile" className="rounded-circle border" style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }} />
          </label>
          <small className="text-muted d-block">Click to upload</small>
        </div>
        <h2 className="text-center text-primary fw-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" autoFocus />
            </div>
            <div className="col-md-6 mb-2">
              <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            </div>
          </div>
          <input type="email" className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <div className="row">
            <div className="col-md-6 mb-2">
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </div>
            <div className="col-md-6 mb-2">
              <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            </div>
          </div>
          <input type="date" className="form-control mb-2" name="dob" value={formData.dob} onChange={handleChange} />
          <select className="form-control mb-2" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="tel" className="form-control mb-2" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
          <textarea className="form-control mb-2" name="address" value={formData.address} onChange={handleChange} placeholder="Address" rows="2"></textarea>
          <div className="row">
            <div className="col-md-3 mb-2">
              <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
            </div>
            <div className="col-md-3 mb-2">
              <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
            </div>
            <div className="col-md-3 mb-2">
              <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
            </div>
            <div className="col-md-3 mb-2">
              <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold mb-2" disabled={!formData.email || !formData.password}>
            Register
          </button>
          <div className="text-center">
            <Link to="/login" className="text-decoration-none">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
