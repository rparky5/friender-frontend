import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  // static token = "";
  static token = "";

  /** testing token */
  // static token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.log("token in FrienderApi is", FrienderApi.token);
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    console.log("headers are", headers )
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** methods needed for ---------
   * login
   * logout <-- NOT needed here
   * register
   * findAFriend
   * matches
   * messages
   * like/dislike a user
   * create message
  */


  /** Get details on a company by . */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  /** do below logic before getting to this point */

  /** Get list of all companies */
  static async getCompanies(params) {
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  /** Get all jobs */
  static async getJobs(params) {
    let res = await this.request(`jobs`, params);
    return res.jobs;
  }

  /**gets JWT token from API with proper credentials */
  static async login({ username, password }) {
    const credentials = { username, password };
    let res = await this.request(`auth/token`, credentials, "post");
    return res.token;
  }

  /**gets user info object from API */
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**creates a new user and returns a JWT Token */
  static async signUpUser(user) {
    let res = await this.request(`auth/register`, user, "post");
    return res.token;
  }

  /**updates user info and returns the updated user info object */
  static async updateUser(userInfo, username) {
    let res = await this.request(`users/${username}`, userInfo, "patch");
    return res.user;
  }
}

export default FrienderApi;