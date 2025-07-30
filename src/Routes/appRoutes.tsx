// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/login/Login';
import { Dashboard } from '../components/Layout/Dashboard/Dashboard';
import { HomeData } from '../components/HomeData/HomeData';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route path="/app" element={<Dashboard />}>
      <Route index element={<HomeData />} />

      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
