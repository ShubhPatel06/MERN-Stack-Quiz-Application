import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import {
  FaSearch,
  FaPlus,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaList,
  FaHome,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <header>
      <div className="flex items-center justify-between p-4 shadow-md sm:h-20">
        <Link to="/home">
          <h1 className="flex flex-wrap text-lg font-bold sm:text-2xl text-slate-900">
            Quizzz
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {location.pathname == "/home" && (
          <form className="items-center hidden p-2 border rounded-lg md:flex bg-slate-100">
            <input
              type="text"
              placeholder="Search quizzes..."
              className="bg-transparent w-60 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        )}
        <nav className="items-center hidden gap-4 md:flex">
          {location.pathname !== "/create-quiz" && (
            <Link
              to={"/create-quiz"}
              className="flex items-center gap-1 px-2 py-1 text-lg font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
            >
              <FaPlus size={15} />
              <span className="">Quiz</span>
            </Link>
          )}
          {location.pathname !== "/home" && (
            <Link
              to={"/home"}
              className="flex items-center gap-1 px-2 py-1 text-lg font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
            >
              <FaHome size={15} />
              <span className="">Home</span>
            </Link>
          )}
          <button
            className="relative flex items-center gap-2 text-lg cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          >
            <span>{userInfo?.username}</span>
            <FaChevronDown size={15} />
          </button>
          {dropdown && (
            <ul className="absolute overflow-hidden border border-gray-300 rounded-lg shadow-md bg-slate-50 right-4 top-14 min-w-max">
              <li
                className="flex items-center gap-3 px-4 py-2 text-gray-800 cursor-pointer hover:bg-slate-100"
                title="My Quizzes"
              >
                <FaList />
                <span>My Quizzes</span>
              </li>
              <li
                className="flex items-center gap-3 px-4 py-2 text-gray-800 cursor-pointer hover:bg-slate-100"
                title="Logout"
                onClick={sendLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </li>
            </ul>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div onClick={() => setNav(!nav)} className="block md:hidden">
          {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>

        <div
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-slate-50 ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          <div className="flex flex-col gap-4">
            <form className="flex items-center p-1 mx-2 mt-3 bg-white border rounded-lg">
              <input
                type="text"
                placeholder="Search quizzes..."
                className="w-full p-2 bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <FaSearch className="text-slate-600" />
              </button>
            </form>
            <nav className="flex flex-col items-center gap-4">
              <Link
                to={"/create-quiz"}
                className="flex items-center gap-1 px-2 py-1 text-lg font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
              >
                <FaPlus size={15} />
                <span className="">Quiz</span>
              </Link>
              <button
                className="flex items-center gap-3 px-4 py-2 text-gray-800 cursor-pointer"
                title="Logout"
                onClick={sendLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
