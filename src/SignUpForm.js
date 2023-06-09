import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Sign up as a new user
 *
 * Props:
 * - signUp()
 *
 * State:
 * - formData {}
 * - errors[]
 *
 * RoutesList -> SignUpForm
 */

//TODO: see feedback in LoginForm
function SignUpForm({ signup }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    hobbies:'',
    zipCode:'',
    radius:'',
    photoUrl:''
  });
  console.log("formdata upon loading initially is", formData);

  function handleError(error) {
    console.log("error in handleErrors is...", error);
    setErrors([...error]);
  }

  function handleChange(evt) {
    console.log("formdata in handlechange is", formData)

    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleFileChange(evt) {

    const file = evt.target.files[0];
    setFormData((fData) => ({
      ...fData,
      photoUrl: file,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/");
      setErrors([]);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="col-4 mx-auto position-absolute top-50 start-50 translate-middle text-dark">
      <h2 className="text-dark">Sign Up</h2>
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
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            id="firstName"
            value={formData?.firstName || ""}
            onChange={handleChange}
            aria-describedby="firstNameHelp"
            aria-required="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            name="lastName"
            type="text"
            className="form-control"
            id="lastName"
            value={formData?.lastName || ""}
            onChange={handleChange}
            aria-describedby="lastNameHelp"
            aria-required="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            value={formData?.email || ""}
            onChange={handleChange}
            aria-describedby="emailHelp"
            aria-required="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hobbies" className="form-label">
            Hobbies
          </label>
          <input
            name="hobbies"
            type="text"
            className="form-control"
            id="hobbies"
            value={formData?.hobbies || ""}
            onChange={handleChange}
            aria-describedby="hobbiesHelp"
            aria-required="true"
            required
          />
          </div>
          <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            name="zipCode"
            type="number"
            className="form-control"
            id="zipCode"
            value={formData?.zipCode || ""}
            onChange={handleChange}
            aria-describedby="zipCodeHelp"
            aria-required="true"
            required
          />
          </div>
          <div className="mb-3">
          <label htmlFor="radius" className="form-label">
            Look for friends within _____ miles
          </label>
          <input
            name="radius"
            type="number"
            className="form-control"
            id="radius"
            value={formData?.radius || ""}
            onChange={handleChange}
            aria-describedby="radiusHelp"
            aria-required="true"
            required
          />
          </div>
          <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            Upload a photo
          </label>
          <input
            name="photoUrl"
            type="file"
            className="form-control"
            id="photoUrl"
            value={""}
            onChange={handleFileChange}
            aria-describedby="photoUrlHelp"
            aria-required="true"
          />
        </div>
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

export default SignUpForm;