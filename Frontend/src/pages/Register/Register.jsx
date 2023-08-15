import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  console.log(selectedImage);
  //image updalod function//
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    transforFile(file);
  };
  //  ----------------- updalod image using cloudinary api -----------------
  // Image upload function
  const uploadImage = async () => {
    try {
      const formData = new FormData();

      formData.append("file", selectedImage);
      formData.append("upload_preset", "ShopOnline");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/decy2t1yc/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const transforFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const RegisterUser = {
    email: email,
    FullName: FullName,
    password: password,
    img_profile_user: "", // We will update this with the image URL later
  };

  //------------------------------register functionn------------------------------//
  const handleClick = async () => {
    try {
      setLoading(true); // Set loading state to true

      // Upload the image and get the URL
      const imgURL = await uploadImage();
      if (!imgURL) {
        console.error("Error uploading image.");
        setLoading(false); // Set loading state to false
        return;
      }

      // Update the RegisterUser object with the image URL
      RegisterUser.img_profile_user = imgURL;

      // Make the API call to register the user
      const response = await axios.post(
        "http://localhost:443/client/auth/Register",
        RegisterUser
      );
      console.log(response.data);
      setLoading(false); // Set loading state to false
      navigation("/"); // Navigate to the home page or any other page after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      setErr(err);
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>ShopLena</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <div className="form">
            <div className="group">
              <label htmlFor="fileUpload" className="fileUploadLabel">
                <img
                  className="profilePic"
                  src={
                    !selectedImage
                      ? "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
                      : selectedImage
                  }
                  alt=""
                />
                <input
                  type="file"
                  name="file"
                  id="fileUpload"
                  className="fileUploadInput"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {loading ? (
              <div> Loding</div>
            ) : (
              <button onClick={() => handleClick()}>Register</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
