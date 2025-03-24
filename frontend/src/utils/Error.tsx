import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/home");
    }
  }, [time, navigate]);

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen gap-3">
      <h1 className="text-3xl text-white text-center w-full">
        Page Not Found! Check the URL. <br />
        Redirecting to home page in {time} seconds...
      </h1>
      <img src="/images/sad-cat.jpg" alt="Sad cat" className="max-w-xs" />
    </div>
  );
};

export default ErrorPage;
