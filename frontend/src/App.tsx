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
        {/* <Route path="/hom" element={<Navigate to={LANDING_PAGE} />} /> */}
        <Route path="/home" element={<LandingPage />} />
        <Route path="/home:id=1" element={<HomePage />} />
        <Route path="/search:id=1" element={<ResultsPage />} />
        {/* if there is any userArguments then pass it to home page else landing page */}
        <Route
          path="/authenticate?type=login"
          element={<AuthenticationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
