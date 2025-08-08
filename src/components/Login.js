import { useState, useContext } from "react";
import noteContext from "../context/notes/Notecontext";

import { useNavigate } from "react-router-dom";

const Login = ({ setAlert }) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useContext(noteContext);

  const [details, setdetails] = useState({
    email: "",
    password: "",
  });

  const changeDetail = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await loginUser(details.email, details.password);
    if (success) {
      setAlert("Login success", "success");

      navigate("/");
    } else {
      setAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div className="container">
    <h1 className="b-3">Login to continue noteCloud</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={changeDetail}
            value={details.email}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            onChange={changeDetail}
            value={details.password}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary my-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Login;
