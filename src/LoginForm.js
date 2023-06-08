import React, { useState, useContext } from "react";
import userContext from "./userContext";
import { Navigate } from "react-router-dom";

/** Allows user to login
 *
 * Props:
 * - login()
 *
 * State:
 * -formData{}
 * -errors[]
 *
 * RoutesList -> LoginForm
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({username:"", password: ""});
  const { user } = useContext(userContext);
  const [errors, setErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleError(error) {
    console.log("error in handleErrors is...", error);
    setErrors([...error]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      console.log("form data is", formData)
      await login(formData);
      handleError([]);
    } catch (error) {
      handleError(error);
    }
  }

  if (user) return <Navigate to="/findafriend" />;

  return (
    <div className="col-4 mx-auto position-absolute top-50 start-50 translate-middle text-white">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            value={formData?.username || ""}
            onChange={handleChange}
            aria-describedby="usernameHelp"
            aria-required="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            value={formData?.password || ""}
            onChange={handleChange}
            aria-describedby="passwordHelp"
            aria-required="true"
            required
          />
        </div>

        {/* TODO: refactor this into seperate alert component */}
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <p key={index} className="mb-0 small">
                Error: {error}
              </p>
            ))}
          </div>
        )}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;