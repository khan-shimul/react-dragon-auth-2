import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  // console.log("location in the login page", location);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // login
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        // navigate after login
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Navbar />
      <div className="">
        <h2 className="text-center font-bold text-3xl mt-5">
          Login your account
        </h2>
        <form
          onSubmit={handleLogin}
          className="card-body md:3/4 lg:w-1/2 mx-auto"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="text-center">
          Do Not Have An Account?{" "}
          <Link className="text-red-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
