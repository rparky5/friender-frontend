import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import userContext from "./userContext";

/** global navigation bar, renders different NavLinks depending on if
 * current user is present
 *
 * Props: None
 *
 * State: None
 *
 * App -> JobCardList -> {NavLink*4 if logged in OR NavLink*2 if not}
 */
function NavBar({ logout }) {
  const { user } = useContext(userContext);

  function handleLogout() {
    logout();
  }
  //BELOW: login and signup are same (minus changing some input fields)
  //keep the log out, maybe keep profile,

  //CHANGE: No companies or Jobs. ADD: FindAFriend, matches(will show matches
  //and messages display area and create a message field)
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Friender
        </NavLink>
        {user ? (
          <div className="navbar-nav mr-auto">
            <NavLink to="/findafriend" className="nav-link">
              Find-A-Friend
            </NavLink>
            <NavLink to="/matches" className="nav-link">
              Matches
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={handleLogout}>
              Log out: {`${user.username}`}
            </NavLink>
          </div>
        ) : (
          <div className="navbar-nav mr-auto">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;