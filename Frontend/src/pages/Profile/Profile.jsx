import { useSelector } from "react-redux";
import "./profile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  const [cookie] = useCookies();
  const [profileUser, setProfileUser] = useState(null); // Initialize as null to indicate data is loading
  const id = user.id_user;
  const token = cookie.token;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:443/client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setProfileUser(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profileUser) {
    // Data is still loading, show a loading indicator or skeleton UI
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="images">
        <img src={profileUser.img_profile_user} alt="" className="cover" />
        <img src={profileUser.img_profile_user} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{profileUser.FullName}</span>
            <div className="info">
              <div>
                {" "}
                <Link className="link" to={"/carts"}>
                  your cart list
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
