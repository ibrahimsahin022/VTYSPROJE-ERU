import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-14 bg-gray-900 text-white flex items-center justify-between px-6">
      <h1 className="font-bold">MyApp</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm"
        >
          Çıkış
        </button>
      </div>
    </div>
  );
};

export default Navbar;
