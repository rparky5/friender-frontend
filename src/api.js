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
  static token = "";

  /** base api request function */
  static async request(endpoint, data = {}, method = "get") {
    console.log("token in FrienderApi is", FrienderApi.token);
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    console.log("headers are", headers);
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

  /**creates a new user and returns a JWT Token */
  static async signup(user) {
    let res = await this.request(`auth/register`, user, "post");
    this.token = res.token;
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
  static async likeOrDislikeUser(username, interactingUser) {
    let res = await this.request(`matches/${username}`, interactingUser, "post");
    return res.interaction
  }

  /**updates user info and returns the updated user info object */
  // static async updateUser(userInfo, username) {
  //   let res = await this.request(`users/${username}`, userInfo, "patch");
  //   return res.user;
  // }
}

export default FrienderApi;