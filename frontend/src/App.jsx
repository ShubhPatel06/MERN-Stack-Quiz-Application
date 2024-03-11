import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import Layout from "./components/Layout";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import CreateQuiz from "./views/CreateQuiz";
import MyQuizzes from "./views/MyQuizzes";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/edit-quiz/:id" element={<CreateQuiz />} />
      </Route>

      {/* Redirect to login page for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
