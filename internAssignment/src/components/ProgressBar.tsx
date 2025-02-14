
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(33.33); // Default to homepage

  useEffect(() => {
    if (location.pathname === "/") {
      setProgress(33.33); // Homepage -> 33.33%
    } else if (location.pathname === "/products") {
      setProgress(66.66); // Middle Page -> 66.66%
    } else if (location.pathname === "/cart") {
      setProgress(100); // Cart Page -> 100%
    }
  }, [location]);

  return (
    <div className="fixed top-1 left-0 w-full h-2 bg-gray-200">
      <div
        className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}>
      </div>
    </div>
  );
};

export default ProgressBar;
