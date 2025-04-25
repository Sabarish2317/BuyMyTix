import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./components/Global/Error";
import {
  LANDING_PAGE,
  AUTHENTICATE_PAGE,
  HOME_PAGE,
  RESULTS_PAGE,
  TICKET_DETAILS_PAGE,
  HISTORY_PAGE,
} from "./routes/appRoutes";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import HistoryPage from "./pages/HistoryPage";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ToastContainer } from "react-toastify";

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
          <Routes>
            {/* Urls are stored in utils/routing */}

            <Route path="/*" element={<ErrorPage />} />
            <Route path={LANDING_PAGE} element={<LandingPage />} />
            <Route path={HOME_PAGE} element={<HomePage />} />
            <Route path={RESULTS_PAGE} element={<ResultsPage />} />
            <Route path={HISTORY_PAGE} element={<HistoryPage />} />
            {/* if there is any userArguments then pass it to home page else landing page */}
            <Route path={AUTHENTICATE_PAGE} element={<AuthenticationPage />} />
            <Route path={TICKET_DETAILS_PAGE} element={<TicketDetailsPage />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
