import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import FindAFriendList from "./FindAFriendList"; //was prev CompaniesList
// import CompanyDetails from "./CompanyDetails";
import Matches from "./Matches"; //was prev Jobs
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import userContext from "./userContext";


/** Holds all route element for the application
 *
 * Props: None
 *
 * State: None
 *
 * App -> JobCardList ->
 * renders via Route Element:
 * {Homepage, CompaniesList, CompanyDetails, Jobs, login, sign up}
 */
function RoutesList({login, signUp, update}) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignUpForm signUp={signUp}/>} />
      {user &&
      <>
      <Route path="/findafriend" element={<FindAFriendList />} />
      {/* <Route path="/company/:name" element={<CompanyDetails />} /> */}
      <Route path="/matches" element={<Matches />} />
      <Route path="/profile" element={<Profile update={update} />} />
      </>
      }
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default RoutesList;