import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  getProfile,
} from "../api/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 LOGIN
  const login = async (data) => {
    const res = await loginRequest(data);

    // token kaydet
    localStorage.setItem("token", res.token);

    // token ile profili çek
    const profile = await getProfile();
    setUser(profile);
  };

  // 📝 REGISTER
  const register = async (data) => {
    const res = await registerRequest(data);

    // token kaydet
    localStorage.setItem("token", res.token);

    // token ile profili çek
    const profile = await getProfile();
    setUser(profile);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔄 SAYFA YENİLENİNCE OTURUMU KORU
  useEffect(() => {
    const initAuth = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      initAuth();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
