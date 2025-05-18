import { useNavigate } from "react-router-dom"
import Footer from "../footer/Footer.jsx"
import Header from "../header/Header.jsx"
import SchoolIcon from "../icons/DashboardIcons/SchoolIcon.jsx"
import FacultyIcon from "../icons/DashboardIcons/FacultyIcon.jsx"
import TeacherIcon from "../icons/DashboardIcons/TeacherIcon.jsx"
import UserIcon from "../icons/DashboardIcons/UserIcon.jsx"
import ReportIcon from "../icons/DashboardIcons/ReportIcon.jsx"
import StudyPlanIcon from "../icons/DashboardIcons/StudyPlanIcon.jsx"
import CourseProgramIcon from "../icons/DashboardIcons/CourseProgramIcon.jsx"
import Backup from "../backup/Backup.jsx"
import { useState } from "react"
import BackupIcon from "../icons/DashboardIcons/BackupIcon.jsx"
import CarrearIcon from "../icons/DashboardIcons/CarrearIcon.jsx"
import { useAtom } from "jotai"
import { userAtom } from "../validatelogin/ValidateLogin.jsx"
import RecycleIcon from "../icons/DashboardIcons/RecycleIcon.jsx"


function Dashboard() {
  const navigate = useNavigate()
  const [showBackup, setShowBackup] = useState(false);
  const [user] = useAtom(userAtom);

  const modules = [
    {
      title: "Escuela",
      icon: SchoolIcon,
      description: "Gestionar información de las escuelas",
      path: "/school",
      iconBg: "bg-blue-100",
    },
    {
      title: "Facultad",
      icon: FacultyIcon,
      description: "Gestionar información de las facultades",
      path: "/faculty",
      iconBg: "bg-green-100",
    },
    {
      title: "Carreras",
      icon: CarrearIcon,
      description: "Gestionar información de las Carreras",
      path: "/career", //cambiar a carrera
      iconBg: "bg-lime-100",

    },
    {
      title: "Docentes",
      icon: TeacherIcon,
      description: "Gestionar información de los docentes",
      path: "/teacher",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Usuarios",
      icon: UserIcon,
      description: "Gestionar información de las usuarios",
      path: "/user",
      iconBg: "bg-purple-100",
    },
    {
      title: "Planes de estudio",
      icon: StudyPlanIcon,
      description: "Gestionar información de los planes de estudio",
      path: "/studyplans",
      iconBg: "bg-red-100",
    },
    {
      title: "Programas del Curso",
      icon: CourseProgramIcon,
      description: "Gestionar información de los programas del curso",
      path: "/coursesprogram",
      iconBg: "bg-cyan-100",
    },
    {
      title: "Reportes",
      icon: ReportIcon,
      description: "Gestionar información de los reportes",
      path: "/report",
      iconBg: "bg-orange-100",
    },
    {
      title: "Respaldos",
      icon: BackupIcon,
      description: "Gestionar los respaldos del sistema",
      path: "backup",
      iconBg: "bg-pink-100",
    }

    , {
      title: "Papelera",
      icon: RecycleIcon,
      description: "Recupera la informacion antes de ser eliminada definitivamente",
      path: "/recyclingbin",
      iconBg: "bg-emerald-100",
    }

  ]

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header />

      <main className="overflow-auto p-[1.5vh] bg-gray-50">
        <div className="max-w-[70vw] mx-auto">
          <div className="mb-[1.5vh]">
            <h1 className="text-[2vw] font-bold">Inicio</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
          {modules
  .filter((module) => {
    const adminOnlyModules = [
      "Respaldos",
      "Reportes",
      "Planes de estudio",
      "Programas del Curso"
    ];
    if (adminOnlyModules.includes(module.title)) {
      console.log(user?.ROLE_NAME);
      console.log(user);
      return user?.ROLE_NAME === "ROOT" || user?.ROLE_NAME === "ADMIN";
      
    }
    return true; // los demás módulos se muestran siempre
  })
  .map((module) => (
    <div
      key={module.path}
      className="border rounded-[0.5vh] p-[1.5vh] bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() =>
        module.path.includes("backup")
          ? setShowBackup(true)
          : handleNavigate(module.path)
      }
    >
      <div className={`icon rounded-full ${module.iconBg} flex items-center justify-center mb-[1vh]`}>
        <module.icon />
      </div>
      <h2 className="text-[1.2vw] font-semibold mb-[0.5vh]">{module.title}</h2>
      <p className="text-gray-600 mb-[1vh] text-[0.9vw]">{module.description}</p>
      <div className="flex items-center text-blue-600 font-medium text-[0.9vw]">
        Administrar {module.title.toLowerCase()}
        <svg className="w-[1vw] h-[1vw] ml-[0.25vw]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
))}

          </div>
        </div>
        {showBackup && <Backup isOpen={showBackup} setOpen={setShowBackup} />}
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
