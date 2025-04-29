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
} from "./routes/appRoutes";

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
          <Suspense fallback={<div className="p-4">Loading...</div>}>
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
            </Routes>
          </Suspense>
        </Router>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
