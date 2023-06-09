import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import FindAFriendList from "./FindAFriendList";
import Matches from "./Matches"; //was prev Jobs
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import userContext from "./userContext";
import NotFoundError from "./NotFoundError";
import ServerError from "./SeverError";


/** Holds all route element for the application
 *
 * Props: None
 *
 * State: None
 *
 * App -> RoutesList
 */
function RoutesList({ login, signup }) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/404" element={<NotFoundError />} />
      <Route path="/500" element={<ServerError />} />

      {!user && (
      <>
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignUpForm signup={signup}/>} />
      </>
      )}
      {user &&(
      <>
        <Route path="/findafriend" element={<FindAFriendList />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile" element={<Profile />} />
      </>
      )}
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
export default RoutesList;