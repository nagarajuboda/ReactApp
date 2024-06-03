import { Route, Routes } from "react-router-dom";
import VerifyOTP from "../Authentication/VerifyOTP";
import About from "../Authentication/About";

import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Dashboard from "../UserComponents/Dashboard";
export default function UserRouting() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="verifyotp" element={<VerifyOTP />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="UserDashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Login />} />
      {/* Catch-all route to redirect to Home */}
    </Routes>
  );
}
