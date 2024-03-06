import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons library
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData.username, formData.password]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, userInfo } = await login(formData).unwrap();
      dispatch(setCredentials({ accessToken, userInfo }));
      setFormData({ username: "", password: "" });
      navigate("/home");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data.message);
      } else if (err.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p ref={errRef} className="text-red-600 mb-2 p-1">
        {errMsg}
      </p>
      <div className="p-6 max-w-md w-full bg-white shadow-xl rounded-md">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-gray-300 p-3 rounded-lg"
            id="username"
            ref={userRef}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-2 border-gray-300 p-3 rounded-lg w-full"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            className={`bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80`}
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color={"#FFF"} /> : "Sign In"}
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
