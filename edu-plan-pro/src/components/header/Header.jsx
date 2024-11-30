import React from "react";
import { useNavigate } from "react-router-dom";
import LogoTransparent from "../icons/HeaderIcons/LogoTransparent";
import SideBar from "../aside/SideBar";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/coursesplan", {
      replace: true,
      state: {
        logged: true,
      },
    });
  };

  return (
    <header className="w-full h-[8vh] bg-gradient-mainNavbar px-[2vh] py-[0.5vh]">
      <div className="flex items-center w-full h-full justify-end">
        <div className="absolute left-[1%] h-[7vh] w-[7vh]">
          <button onClick={handleLogoClick} className="flex">
            <LogoTransparent />
          </button>
        </div>
        <SideBar/>
      </div>

      

    </header>
  );
};

export default Header;
