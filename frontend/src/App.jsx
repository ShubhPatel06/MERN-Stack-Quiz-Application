import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route index element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        {/* Add protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
