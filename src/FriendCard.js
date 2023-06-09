import React from "react";
import { Link } from "react-router-dom";
import "./FriendCard.css";

/** presentational card that will show info for one company
 *
 * Props:
 * -company{}
 *
 * State:
 * -None
 *
 * CompanyDetails -> CompanyCard -> {Link}
 */

function FriendCard({ friend }) {

  return (
    <div className="col-sm-9 mx-auto container p-3 my-3 text-left friend-card bg-white">
     {friend.photoUrl !== "" && (
          <div className="image-container">
            <img
              src={friend.photoUrl}
              alt="friend-pic"
              className="width:8.5rem px-2 py-2"
            />
          </div>
        )}
        <h2 className="company-title text-dark">{friend.username}</h2>
        <h3 className="text-dark">{friend.firstName} {friend.lastName}</h3>
        <h5 className="text-dark">{friend.zipCode}</h5>
        <p className="text-dark">{friend.hobbies}</p>
    </div>
  );
}
export default FriendCard;