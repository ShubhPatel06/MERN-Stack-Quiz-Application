import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const Header = () => {
  const navigate = useNavigate();
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <header>
      <div className="flex items-center justify-between">
        <Link to="/home">
          <h1 className="dash-header__title">Quizzz</h1>
        </Link>
        <nav className="flex">
          <button className="" title="Logout" onClick={sendLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
