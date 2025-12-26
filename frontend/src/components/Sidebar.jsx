import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-700 transition";

  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen">
      <nav className="mt-4 flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/analysis" className={linkClass}>
          Analiz
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          Profil
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          Upload
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
