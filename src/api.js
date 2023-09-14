import axios from "axios";
const FormData = require('form-data');

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  static token = "";

  /** base api request function */
  static async request(endpoint, data = {}, method = "get", headers = { Authorization: `${FrienderApi.token}` }) {
    console.debug("API Call:", endpoint, data, method, headers);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${FrienderApi.token}` };
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
  //add formDAta to signup where image is being sent

  /**creates a new user and returns a JWT Token */
  static async signup(user) {
    let formData = new FormData();

    for(const key in user){
      if(key !== "photoUrl"){
        if(user.hasOwnProperty(key)){
          formData.append(`${key}`, `${user[key]}`)
        }
      }
    }
    formData.append("photoUrl", user.photoUrl);

    // boundary=${formData._boundary}
    let headers = {
      "Content-Type": `multipart/form-data`,
    }

    let res = await this.request(`auth/register`, formData, "post", headers);
    this.token = res.token;
    //return user object as well as token
    return res.token;
  }

  /**gets JWT token from API with proper credentials.
   * credentials is {username, password}
   */
  static async login(credentials) {
    let res = await this.request(`auth/token`, credentials, "post");
    this.token = res.token;
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`auth/${username}`);
    return res.user
  }

  static async getPossibleFriends(username) {
    let res = await this.request(`findFriends/${username}`);
    return res.users
  }

  static async getUserMatches(username) {
    let res = await this.request(`matches/${username}`);
    return res.matches
  }

  static async getUserMessages(username) {
    let res = await this.request(`messages/${username}`);
    return res.messages
  }

  /** requires username, msg like {fromUser, message} */
  static async createMessage(username, msg) {
    let res = await this.request(`messages/${username}`, msg, "post");
    return res.message
  }

  /** requires username, interactingUser like {viewedUser, didLike} */
  static async likeAUser(username, interactingUser) {
    let res = await this.request(`matches/${username}`, {viewedUser: interactingUser, didLike: true}, "post");
    return res.interaction
  }

  /** requires username, interactingUser like {viewedUser, didLike} */
  static async dislikeAUser(username, interactingUser) {
    let res = await this.request(`matches/${username}`, {interactingUser: interactingUser, didLike: false}, "post");
    return res.interaction
  }

  /**updates user info and returns the updated user info object */
  // static async updateUser(userInfo, username) {
  //   let res = await this.request(`users/${username}`, userInfo, "patch");
  //   return res.user;
  // }
}

export default FrienderApi;