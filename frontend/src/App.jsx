import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/landing/PublicLayout';
import Layout from './components/Layout';
import AdminRoute from './components/admin/AdminRoute';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Assessment from './pages/Assessment';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthForm isLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthForm isLogin={false} />
          </PublicRoute>
        }
      />

      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="goals" element={<Goals />} />
        <Route path="journal" element={<Journal />} />
        <Route path="assessment" element={<Assessment />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
