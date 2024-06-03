import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRouting from "./Components/Routing/UserRouting";
import AdminRoutes from "./Components/Routing/AdminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouting />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
