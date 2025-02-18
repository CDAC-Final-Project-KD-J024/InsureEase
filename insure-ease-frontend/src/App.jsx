import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Import Redux state selector
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common pages
import Navbar from "./components/common/Navbar";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import InsuranceOptions from "./pages/common/InsuranceOptions";

// Insurance Pages & Calculators
import CarInsurance from "./pages/common/CarInsurance";
import LifeInsurance from "./pages/common/LifeInsurance";
import HealthInsurance from "./pages/common/HealthInsurance";
import HomeInsurance from "./pages/common/HomeInsurance";
import CarInsuranceCalculator from "./pages/common/CarInsuranceCalculator";
import LifeInsuranceCalculator from "./pages/common/LifeInsuranceCalculator";
import HealthInsuranceCalculator from "./pages/common/HealthInsuranceCalculator";
import HomeInsuranceCalculator from "./pages/common/HomeInsuranceCalculator";

// User Pages (Protected)
import ProtectedRoute from "./components/common/ProtectedRoute";
import Profile from "./pages/user/Profile";
import MyPolicies from "./pages/user/MyPolicies";
import Orders from "./pages/user/Orders";
import Claims from "./pages/user/Claims";
import PolicyDetails from "./pages/user/PolicyDetails";
import ClaimStatus from "./pages/user/ClaimStatus";
import Dashboard from "./pages/user/Dashboard";

// Admin Pages (Protected)
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDetails from "./components/admin/UserDetails";
import ManagePolicies from "./pages/admin/ManagePolicies";
import PolicyDetailsAdmin from "./components/admin/PolicyDetailsAdmin";
import ApproveClaims from "./pages/admin/ApproveClaims";
import ManageOrders from "./pages/admin/ManageOrders";
import Analytics from "./pages/admin/Analytics";
import OrderDetails from "./components/admin/OrderDetails";
import AddPolicy from "./components/admin/AddPolicy";
import EditPolicy from "./components/admin/EditPolicy";
import ClaimDetails from "./pages/user/ClaimDetails";

const App = () => {
  // Get authentication & role from Redux state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="container">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/insurance-options" element={<InsuranceOptions />} />

        {/* Insurance Pages */}
        <Route path="/insurance/car" element={<CarInsurance />} />
        <Route path="/car-insurance-calculator" element={<CarInsuranceCalculator />} />
        <Route path="/insurance/life" element={<LifeInsurance />} />
        <Route path="/life-insurance-calculator" element={<LifeInsuranceCalculator />} />
        <Route path="/insurance/health" element={<HealthInsurance />} />
        <Route path="/health-insurance-calculator" element={<HealthInsuranceCalculator />} />
        <Route path="/insurance/home" element={<HomeInsurance />} />
        <Route path="/home-insurance-calculator" element={<HomeInsuranceCalculator />} />

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-policies" element={<MyPolicies />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/policy/:id" element={<PolicyDetails />} />
          <Route path="/claim-status" element={<ClaimStatus />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />

        </Route>

        {/* Admin Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isAdmin={user?.role === "admin"}
              adminOnly={true}
            />
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/user/:id" element={<UserDetails />} />
          <Route path="/admin/policies" element={<ManagePolicies />} />
          <Route path="/admin/policy/:id" element={<PolicyDetailsAdmin />} />
          <Route path="/admin/claims" element={<ApproveClaims />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/order-details/:id" element={<OrderDetails />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/policy/add" element={<AddPolicy/>}/>
          <Route path="/admin/policy/edit/:id" element={<EditPolicy/>}/>
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
