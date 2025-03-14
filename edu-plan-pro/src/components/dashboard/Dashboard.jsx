import { useNavigate } from "react-router-dom"
import Footer from "../footer/Footer.jsx"
import Header from "../header/Header.jsx"
import AccountCircleAdmin from "../icons/AsideIcons/AccountCircleAdmin.jsx"

function Dashboard() {
  const navigate = useNavigate()

  const modules = [
    {
      title: "School",
      icon: AccountCircleAdmin,
      description: "Manage school information and settings",
      path: "/school",
      iconBg: "bg-blue-100",
    },
    {
      title: "Faculty",
      icon: AccountCircleAdmin,
      description: "Add, edit, and manage faculty departments",
      path: "/faculty",
      iconBg: "bg-green-100",
    },
    {
      title: "Teacher",
      icon: AccountCircleAdmin,
      description: "View and manage teacher profiles",
      path: "/teacher",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Users",
      icon: AccountCircleAdmin,
      description: "Manage user accounts and permissions",
      path: "/user",
      iconBg: "bg-purple-100",
    },
    {
        title: "Users",
        icon: AccountCircleAdmin,
        description: "Manage user accounts and permissions",
        path: "/user",
        iconBg: "bg-purple-100",
      },
      {
        title: "Users",
        icon: AccountCircleAdmin,
        description: "Manage user accounts and permissions",
        path: "/user",
        iconBg: "bg-purple-100",
      },
      {
        title: "Users",
        icon: AccountCircleAdmin,
        description: "Manage user accounts and permissions",
        path: "/user",
        iconBg: "bg-purple-100",
      },
      {
        title: "Users",
        icon: AccountCircleAdmin,
        description: "Manage user accounts and permissions",
        path: "/user",
        iconBg: "bg-purple-100",
      },
      {
        title: "Users",
        icon: AccountCircleAdmin,
        description: "Manage user accounts and permissions",
        path: "/user",
        iconBg: "bg-purple-100",
      },
  ]

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header />

      <main className="overflow-auto p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">Access all your CRUD operations from this central dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <div
                key={module.path}
                className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleNavigate(module.path)}
              >
                <div className={`w-12 h-12 rounded-full ${module.iconBg} flex items-center justify-center mb-4`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Go to {module.title}
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard