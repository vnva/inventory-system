import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { siteMap } from '@/consts';
import loadable from '@loadable/component';
import { MainLayout } from '@/layouts';
import { InitialRoute } from './initial';
import { ProtectedRoute } from './protected';
import { SpreadsheetPage } from '@/pages/spreadsheet';

const DashboardPage = loadable(() => import('@/pages/dashboard'));
const SpreadsheetsPage = loadable(() =>
  import('@/pages/spreadsheets').then(m => ({ default: m.SpreadsheetsPage }))
);
// const SpreadsheetPage = loadable(() =>
//   import('@/pages/spreadsheet').then(m => ({ default: m.SpreadsheetPage }))
// );
const SignInPage = loadable(() =>
  import('@/pages/signin').then(m => ({ default: m.SigninPage }))
);
const DocsPage = loadable(() =>
  import('@/pages/docs').then(m => ({ default: m.DocsPage }))
);
const NotFoundPage = loadable(() =>
  import('@/pages/not-found').then(m => ({ default: m.NotFoundPage }))
);

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<InitialRoute />}>
        <Route
          path={siteMap.dashboard.path}
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={siteMap.dashboard.path} element={<DashboardPage />} />
          <Route
            path={siteMap.spreadsheets.path}
            element={<SpreadsheetsPage />}
          />
          <Route
            path={siteMap.spreadsheet.path}
            element={<SpreadsheetPage />}
          />
          <Route path={siteMap.docs.path} element={<DocsPage />} />
        </Route>
        <Route path={siteMap.signin.path} element={<SignInPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
