import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import FriendCard from "./FriendCard";
// import SearchForm from "./SearchForm";
// import JrienderApi from "./api";
import FrienderApi from "./api";

/** Renders a list of company cards, and a search form
 *
 * Props: None
 *
 * State:
 * - object {isLoading: bool, searchBy: str, companies:[]}
 *
 * Effects:
 * - after first render, send API request for list of companies
 *
 * RoutesList -> CompaniesList -> {SearchForm, CompanyCard}
 */

function FindAFriendList() {
  const [data, setData] = useState({
    isLoading: true,
    friends: [],
  });

  /**
   * get an array of all the companies, then updates data state
  */
 async function getFriends() {
   const friends = await FrienderApi.getFriends();
   setData({
     isLoading: false,
     friends: friends.users,
    });
  }

  /** useEffect runs our getCompanies function*/
  useEffect(() => {
    getFriends();
  }, []);

  /** Big changes here, no params being passed in, no form down below to search,
   * this function just runs and pulls all the eligible friends and maps over
   *  them to create a bunch of Friend cards
  */
  // async function submitSearch(params) {
  //   params = !params ? "" : { nameLike: params };
  //   try {
  //     const res = await JrienderApi.getCompanies(params);
  //     setData({
  //       isLoading: false,
  //       companies: res,
  //     });
  //   } catch (err) {
  //     window.alert("there was an error with your search");
  //     return;
  //   }
  // }

  if (data.isLoading) return <h1>Loading....</h1>;

  /** renderInfo receives nothing, returns instances of the CompanyCard component*/
  function renderFriendCards() {
    return data.friends.map((friend) => (
      <FriendCard key={friend.username} friend={friend} />
    ));
  }

  return (
    <div>
      <h1 className="text-dark">Find-A-Friend!</h1>
      <div>
        {renderFriendCards()}
      </div>
      {data.friends.length < 1 && (
        <h3 className="text-white col-6 col mx-auto position-absolute start-50 translate-middle">
          Sorry no friends were found!
        </h3>
      )}
    </div>
  );
}

export default FindAFriendList;
