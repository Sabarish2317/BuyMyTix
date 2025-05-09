import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ProfileProvider } from "./contexts/ProfileContext";

import {
  LANDING_PAGE,
  AUTHENTICATE_PAGE,
  HOME_PAGE,
  RESULTS_PAGE,
  TICKET_DETAILS_PAGE,
  HISTORY_PAGE,
  ADMIN_PAGE,
  REPORT_PAGE,
  CATERGORY_PAGE,
} from "./routes/appRoutes";
import CategoryPage from "./pages/DetailedPopularAndTrendingPage";

const Layout = lazy(() => import("./components/Global/Layout"));
const TickLoader = lazy(() => import("./components/Global/LoadingIcon"));
const AdminDashboard = lazy(() => import("./pages/AdminTitles"));
const ReportsPage = lazy(() => import("./pages/ReportPage"));

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AuthenticationPage = lazy(() => import("./pages/AuthenticationPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const TicketDetailsPage = lazy(() => import("./pages/TicketDetailsPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const ErrorPage = lazy(() => import("./components/Global/Error"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider key={localStorage.getItem("token") || ""}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          pauseOnHover={true}
        />
        <Router>
          <Suspense
            fallback={
              <Layout
                className=" w-screen h-screen flex justify-center self-center items-center bg-black "
                isHomePage={true}
              >
                <TickLoader />
              </Layout>
            }
          >
            <Routes>
              <Route path="/*" element={<ErrorPage />} />
              <Route path={LANDING_PAGE} element={<LandingPage />} />
              <Route path={HOME_PAGE} element={<HomePage />} />
              <Route path={RESULTS_PAGE} element={<ResultsPage />} />
              <Route path={HISTORY_PAGE} element={<HistoryPage />} />
              <Route
                path={AUTHENTICATE_PAGE}
                element={<AuthenticationPage />}
              />
              <Route
                path={TICKET_DETAILS_PAGE}
                element={<TicketDetailsPage />}
              />
              <Route path={ADMIN_PAGE} element={<AdminDashboard />} />
              <Route path={REPORT_PAGE} element={<ReportsPage />} />
              <Route path={CATERGORY_PAGE} element={<CategoryPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
