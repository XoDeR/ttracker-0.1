import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './common/layout';
import { Tags } from './pages/tags';
import { TimeSpansList } from './pages/timespans-list';
/*
import { Page } from './common/Page';
import { DashboardsPage } from './dashboard/DashboardsPage';
import { DashboardPage } from './dashboard/DashboardPage';
import { DailyPage } from './timespan/DailyPage';
import { CalendarPage } from './timespan/calendar/CalendarPage';
import { SettingsPage } from './setting/SettingsPage';
import { TagPage } from './tag/TagPage';
import { UsersPage } from './user/UsersPage';
import { LoginPage } from './login/LoginPage';
*/

export const Router = () => {
  const loggedIn = true;
  const admin = true;

  return (
    <>
      {!loggedIn ? (
        <Routes>
          {/* <Route path="/user/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/user/login" replace />} /> */}
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/timespans/list" element={<TimeSpansList />} />
            <Route path="/user/tags" element={<Tags />} />

            {/* <Route path="/dashboards" element={<DashboardsPage />} />
             <Route path="/dashboard/:id" element={<DashboardPage />} />
             <Route path="/timesheet/list" element={<DailyPage />} />
             <Route path="/timesheet/calendar" element={<CalendarPage />} />
             <Route path="/user/settings" element={<SettingsPage />} />
             <Route path="/user/tags" element={<TagPage />} />
             {admin && <Route path="/admin/users" element={<UsersPage />} />}
             <Route path="/" element={<Navigate to="/timesheet/list" replace />} />
             <Route path="*" element={<Navigate to="/timesheet/list" replace />} /> */}
          </Routes>
        </Layout>
      )}
    </>
  );
};