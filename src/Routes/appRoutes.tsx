// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/login/Login';
import { Dashboard } from '../components/Dashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<Dashboard />}>
      {/* <Route index element={<Dashboard />} /> */}
      {/* <Route path="orders" element={<Orders />} /> */}
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
