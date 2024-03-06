import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import Layout from "./components/Layout";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Redirect to login page for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
