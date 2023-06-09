import React, { useContext } from "react";
// import "./Homepage.css";
import { Link } from "react-router-dom";
import userContext from "./userContext";
/** landing page w/conditional rendering
 *
 * Props: none
 *
 * State: none
 *
 * RoutesList -> Homepage
 */

function Homepage() {
  const user = useContext(userContext);

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <h1 className="text-center text-white text-shadow">Friender</h1>
      <h4 className="text-center text-white">
        All the  job-- **friends** in one, convenient place.
      </h4>
      {user && (
        <h2 className="text-white text-center">
          Welcome Back, {user.firstName}!
        </h2>
      )}
      {!user && (
        <div className=" d-flex justify-content-center ">
          <Link to="/login" className="btn btn-primary mr-5">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary ml-5">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Homepage;