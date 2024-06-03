import { Route, Routes } from "react-router-dom";
import VerifyOTP from "../Authentication/VerifyOTP";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VerifyOTP />} />
    </Routes>
  );
}
