import { Link, Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-lemonade-200 px-4 shadow-md">
          <div className="flex-none lg:hidden">
            <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold text-lemonade-900">
            CMS Portfolio
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-lemonade-100 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <aside className="menu p-4 w-80 min-h-full bg-lemonade-100 text-lemonade-900 border-r border-lemonade-300">
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/projects">Projects</Link>
          </li>
          <li>
            <Link to="/admin/skills">Skills</Link>
          </li>
          <li>
            <Link to="/admin/certificates">Certificates</Link>
          </li>
          <li>
            <Link to="/admin/education">Education</Link>
          </li>
          <li>
            <Link to="/admin/experiences">Experience</Link>
          </li>
          <li>
            <Link to="/admin/contacts">Contact Messages</Link>
          </li>
        </aside>
      </div>
    </div>
  );
}
