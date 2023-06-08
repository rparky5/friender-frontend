import './App.css';
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import backgroundImage from "./background-for-jobly.png";
import userContext from "./userContext";
import FrienderApi from "./api";
import jwt_decode from "jwt-decode";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useTokenLocalStorage();
  const [user, setUser] = useState(null);

  /**logs the current user out */
  function logout() {
    setIsLoading(false);
    setToken("");
    setUser(null);
  }

  /**logs a user in with proper credentials */
  async function login(formData) {
    const newToken = await FrienderApi.login(formData);
    setToken(newToken);
  }

  /**allows a new user to sign up */
  async function signUp(formData) {
    const newToken = await FrienderApi.signUpUser(formData);
    setToken(newToken);
  }

  /**allows a user to update their own info when logged in */
  // async function update({username, lastName, email, firstName}) {
  //   const userInfo = await JrienderApi.updateUser({lastName, email, firstName}, username);
  //   setUser({ ...userInfo });
  // }

  /**gets user object from API upon receipt of JWT token */
  useEffect(() => {
    async function getUserData() {
      if (token !== "") {
        const { username } = jwt_decode(token);
        FrienderApi.token = token;
        const userInfo = await FrienderApi.getUserInfo(username);
        setIsLoading(false);
        setUser({ ...userInfo });
      } else {
        setIsLoading(false);
      }
    }
    getUserData();
  }, [token]);

  if (isLoading) return <h1 className="position-absolute top-50 start-50 text-white">Loading....</h1>;

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList login={login} signUp={signUp} update={update} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
