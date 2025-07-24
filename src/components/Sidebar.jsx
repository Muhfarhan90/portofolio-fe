import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Star,
  GraduationCap,
  Briefcase,
  Mail,
  LogOut,
  Code2,
  BadgeCheck,
} from "lucide-react";

export default function Sidebar({ onLogout, isOpen, toggleSidebar }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`bg-lemonade-100 w-80 p-6 border-r border-lemonade-300 text-lemonade-900 fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block`}
      >
        <div className="mb-8 flex items-center gap-2 text-xl font-semibold">
          <Code2 className="h-6 w-6 text-lemonade-600" />
          <span>CMS Portfolio</span>
        </div>

        <h2 className="text-md font-bold mb-4 text-lemonade-800">Navigation</h2>
        <ul className="space-y-2">
          {[
            { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
            { to: "/admin/projects", label: "Projects", icon: FolderKanban },
            { to: "/admin/skills", label: "Skills", icon: Star },
            {
              to: "/admin/certificates",
              label: "Certificates",
              icon: BadgeCheck,
            },
            { to: "/admin/educations", label: "Educations", icon: GraduationCap },
            { to: "/admin/experiences", label: "Experience", icon: Briefcase },
            { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
            // eslint-disable-next-line no-unused-vars
          ].map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lemonade-200 ${
                  isActive(to) ? "bg-lemonade-200 font-bold" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <button
            onClick={onLogout}
            className="btn bg-red-500 hover:bg-red-600 text-white w-full flex items-center justify-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
