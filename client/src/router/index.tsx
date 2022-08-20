import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { siteMap } from '@/consts';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/dashboard'));
const SignInPage = lazy(() => import('@/pages/signin'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={siteMap.dashboard.path} element={<DashboardPage />} />
        <Route path={siteMap.signin.path} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
