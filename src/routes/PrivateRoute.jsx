import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  //   console.log(location.pathname);

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-center"></span>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
