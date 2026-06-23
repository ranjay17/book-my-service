import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page Not Found</p>
      <NavLink to="/" className="text-blue-600 mt-4">
        Go Home
      </NavLink>
    </div>
  );
};

export default NotFound;