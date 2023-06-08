import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
// import JoblyApi from "./api";
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
    companies: [],
  });

  /**
   * get an array of all the companies, then updates data state
  */
 async function getFriends() {
   const companies = await FrienderApi.getFriends();
   setData({
     isLoading: false,
     companies: companies,
    });
  }

  /** useEffect runs our getCompanies function*/
  useEffect(() => {
    getFriends();
  }, []);

  /** Big changes here, no params being passed in, no form down below to search,
   * this function just runs and pulls all the eligible friends
  */
  async function submitSearch(params) {
    params = !params ? "" : { nameLike: params };
    try {
      const res = await JoblyApi.getCompanies(params);
      setData({
        isLoading: false,
        companies: res,
      });
    } catch (err) {
      window.alert("there was an error with your search");
      return;
    }
  }

  if (data.isLoading) return <h1>Loading....</h1>;

  /** renderInfo receives nothing, returns instances of the CompanyCard component*/
  function renderCompanyCards() {
    return data.companies.map((company) => (
      <CompanyCard key={company.handle} company={company} />
    ));
  }

  return (
    <div>
      <div>
        <SearchForm submitSearch={submitSearch} />
        {renderCompanyCards()}
      </div>
      {data.companies.length < 1 && (
        <h3 className="text-white col-6 col mx-auto position-absolute start-50 translate-middle">
          Sorry no results were found!
        </h3>
      )}
    </div>
  );
}

export default FindAFriendList;
