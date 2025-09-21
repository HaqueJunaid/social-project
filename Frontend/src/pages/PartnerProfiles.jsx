import { useParams } from "react-router-dom";
import '../styles/partnerprofiles.css';

const PartnerProfiles = () => {
  const { id } = useParams();

  return (
    <div className="partner-page">
        <div className="top">
            <h2 className="account-name">@coca-cola</h2>
        <div className="text-image">
            <div className="left">

            </div>
            <div className="right">
                <h4>Junaid haque</h4>
                <div className="stats">
                    <div className="stat">
                        <span className="number">150</span>
                        <span className="label">Posts</span>
                    </div>
                    <div className="stat">
                        <span className="number">2.5K</span>
                        <span className="label">Followers</span>
                    </div>
                    <div className="stat">
                        <span className="number">500</span>
                        <span className="label">Following</span>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        </div>
        <div className="posts">
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
            <div className="post"></div>
        </div>
    </div>
  );
};

export default PartnerProfiles;