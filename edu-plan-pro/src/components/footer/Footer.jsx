import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-UNA-Red text-center text-white h-[5vh] text-[2.1vh] flex items-center justify-center">
      <p className="text-[0.9vw] text-white">
          © {new Date().getFullYear()} EduPlanPro. Todos
          los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
