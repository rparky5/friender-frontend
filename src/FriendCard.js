import React from "react";
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
 *    px-2 py-2
 */

function FriendCard({ friend }) {
  console.log("friend is", friend)
  return (
    <div className="col-sm-9 mx-auto container p-3 my-3 text-left friend-card bg-white">
     {friend.photoUrl !== "" && (
          <div className="">
            <img
              src={friend.photoUrl}
              alt="profile picture"
              className="img-thumbnail image-size"
            />
          </div>
        )}
        <h2 className="company-title text-dark">{friend.username}</h2>
        <h3 className="text-dark">{friend.firstName} {friend.lastName}</h3>
        <p className="text-dark">Hobbies: {friend.hobbies}</p>
    </div>
  );
}
export default FriendCard;