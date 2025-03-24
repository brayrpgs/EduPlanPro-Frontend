import React from "react";
import { useNavigate } from "react-router-dom";
import LogoTransparent from "../icons/HeaderIcons/LogoTransparent";
import SideBar from "../sidebar/SideBar";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard", {
      replace: true,
      state: {
        logged: true,
      },
    });
  };

  return (
    <header className="w-full h-[8vh] bg-gradient-mainNavbar px-[2vh] py-[0.5vh]">
      <div className="flex items-center w-full h-full justify-end">
        <div className="absolute left-[1%] h-[11.5vh] w-[15vh]">

          <div onClick={handleLogoClick} className="w-full h-full cursor-pointer">
          <LogoTransparent/>
          </div>
        </div>
        <SideBar />
      </div>
    </header>
  );
};

export default Header;
