import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-gray-300 p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-3 rounded-lg"
            id="email"
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Already have an account?</p>
          <Link to="/" className="text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
