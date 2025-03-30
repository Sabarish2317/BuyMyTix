import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./utils/Error";
import {
  LANDING_PAGE,
  AUTHENTICATE_PAGE,
  HOME_PAGE,
  RESULTS_PAGE,
} from "./utils/routing";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Urls are stored in utils/routing */}
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to={LANDING_PAGE} />} />
        <Route path={LANDING_PAGE} element={<LandingPage />} />
        <Route path={HOME_PAGE} element={<HomePage />} />
        <Route path={RESULTS_PAGE} element={<ResultsPage />} />
        {/* if there is any userArguments then pass it to home page else landing page */}
        <Route path={AUTHENTICATE_PAGE} element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
