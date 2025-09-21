import { NavLink, useParams } from "react-router-dom";
import '../styles/partnerprofiles.css';
import { use, useEffect, useState } from "react";
import axios from "axios";

const PartnerProfiles = () => {
  const { id } = useParams();

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/food/${id}`)
        .then((res) => {
            setPosts(res.data);
        })
        .catch((err) => { console.error(err); });
    }, []);

    let kitchenName = posts.length > 0 ? posts[0].owner.kitchenName : "Anonymous";
    let email = posts.length > 0 ? posts[0].owner.email : "anonymouse@yahoo.com";
    let followers = posts.length > 0 ? posts[0].owner.followers.length : "0";
    let followings = posts.length > 0 ? posts[0].owner.following.length : "0";
    let noOfPosts = posts.length > 0 ? posts.length : "0";
    

  return (
    <div className="partner-page">
        <div className="top">
            <h2 className="account-name">@{kitchenName}</h2>
        <div className="text-image">
            <div className="left">

            </div>
            <div className="right">
                <h4>{email}</h4>
                <div className="stats">
                    <div className="stat">
                        <span className="number">{noOfPosts}</span>
                        <span className="label">Posts</span>
                    </div>
                    <div className="stat">
                        <span className="number">{followers}</span>
                        <span className="label">Followers</span>
                    </div>
                    <div className="stat">
                        <span className="number">{followings}</span>
                        <span className="label">Following</span>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        </div>
        <div className="posts">
            {
                noOfPosts > 0 ? posts.map((post) => (
                    <NavLink to={"/foodmato/reels/" + post._id} className="post" key={post._id}>
                        <video src={post.video} preload="metadata"></video>
                    </NavLink>
                )) : <h3 style={{textAlign: "center", marginTop: "20px"}}>No Posts Yet!</h3>
            }
        </div>
    </div>
  );
};

export default PartnerProfiles;