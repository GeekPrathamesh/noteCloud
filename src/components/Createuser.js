import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/Notecontext";

const Createuser = ({setAlert}) => {
      const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

  const { createUser } = useContext(noteContext);

  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeDetail = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
        e.preventDefault();
        const success = await createUser(details.name,details.email,details.password);
          if (success) {
                setAlert("created new user successfully","success")

    navigate("/");
  } else {
    setAlert("Invalid Credentials","danger")
  }

  }

  return (
    <div className="container">
    <h1 className="mb-3">create account in noteCloud</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={changeDetail}
            value={details.name}
            required minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={changeDetail}
            value={details.email}
            required
          />
        </div>
        <div className="mb-3">
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
          minLength={5}
        />
        <button
          type="button"
          className="btn btn-outline-secondary my-3"
          onClick={() => setShowPassword((prev) => !prev)}
        >          {showPassword ? "Hide" : "Show"}
        </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Createuser;
