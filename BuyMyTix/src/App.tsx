import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./utils/Error";
import { HOME_PAGE, AUTHENTICATE_PAGE } from "./utils/routing";
import { useEffect, useState } from "react";
import { getAnimationConstants } from "./utils/constants";

function App() {
  const [, setAnimation] = useState(getAnimationConstants());

  useEffect(() => {
    console.log("Fetching animation values on refresh...");
    setAnimation(getAnimationConstants());
  }, []);

  return (
    <Router>
      <Routes>
        {/* Urls are stored in utils/routing */}
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to={HOME_PAGE} />} />
        <Route path={HOME_PAGE} element={<HomePage />} />
        <Route path={AUTHENTICATE_PAGE} element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
