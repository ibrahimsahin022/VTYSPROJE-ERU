import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AnalysisHistory from "./pages/AnalysisHistory";
import CvUpload from "./pages/CvUpload";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/analysis-history",
    element: (
      <ProtectedRoute>
        <AnalysisHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/upload-cv",
    element: (
      <ProtectedRoute>
        <CvUpload />
      </ProtectedRoute>
    ),
  },
]);

export default router;
