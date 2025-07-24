import { Outlet, useNavigate } from "react-router";
import { Code2, Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="lg:flex min-h-screen relative">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />

      {/* Content Area */}
      <div className="flex-1 min-h-screen bg-lemonade-50">
        {/* Navbar */}
        <div className="w-full navbar bg-lemonade-200 px-6 shadow-sm border-b border-lemonade-300 lg:hidden flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold text-lemonade-900">
            <Code2 className="h-6 w-6 text-lemonade-600" />
            CMS Portfolio
          </div>
          <button onClick={toggleSidebar} className="btn btn-ghost">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
