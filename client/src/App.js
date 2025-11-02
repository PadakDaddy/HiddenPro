import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { AuthProvider, AuthContext } from "./AuthContext";
import ExpertDetailPage from "./pages/ExpertDetailPage";
import ExpertDashboard from "./pages/ExpertDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ExpertProfileForm from "./pages/ExpertProfileForm";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return user ? element : <Navigate to="/login" />;
};

const RoleBasedRoute = ({ element, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== requiredRole) return <Navigate to="/main" />;

  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/main"
            element={<PrivateRoute element={<MainPage />} />}
          />
          <Route
            path="/experts/:id"
            element={<PrivateRoute element={<ExpertDetailPage />} />}
          />
          {/* 역할별 대시보드 */}
          <Route
            path="/expert-dashboard"
            element={
              <RoleBasedRoute
                element={<ExpertDashboard />}
                requiredRole="expert"
              />
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <RoleBasedRoute
                element={<CustomerDashboard />}
                requiredRole="user"
              />
            }
          />
          {/* 전문가 프로필 등록/수정 */}
          <Route
            path="/expert-profile"
            element={
              <RoleBasedRoute
                element={<ExpertProfileForm />}
                requiredRole="expert"
              />
            }
          />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
