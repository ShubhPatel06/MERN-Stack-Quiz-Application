import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 max-w-md w-full bg-white shadow-xl rounded-md">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-gray-300 p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            className={`bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 ${
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
