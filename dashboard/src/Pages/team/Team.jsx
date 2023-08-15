import { useState } from "react";
import ListAdmin from "../../components/ListAdmin";
import { useDispatch } from "react-redux";
const Team = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [Role, setRole] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [FullName, setFullName] = useState("");
  const Dispatch = useDispatch();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    transforFile(file);
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

  const handleSelectChange = (e) => {
    // The selected value can be accessed from e.target.value
    const value = e.target.value;
    setRole(value);
  };

  const handleSubmitAdmin = async () => {
    if (password === verifyPassword) {
      try {
        Dispatch(added(true));
        let imgURL = "";
        if (selectedImage) {
          const formData = new FormData();
          formData.append("file", selectedImage);
          formData.append("upload_preset", "ShopOnline"); // Replace "your_preset_name" with your actual preset name
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/decy2t1yc/image/upload",
            formData
          );

          imgURL = response.data.secure_url;
          const newAdminData = {
            email: email,
            FullName: FullName,
            password: password,
            Role: Role,
            img_Profile: imgURL, // Use the image URL from Cloudinary here
          };
          const res = await axios.post(
            "http://localhost:443/api/admin/add",
            newAdminData
          );
          console.log(res);
          Dispatch(added(false));
        }
      } catch (error) {
        console.log({ error: error.message });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    } else {
      alert("Invalid password");
    }
  };
  const handleCloseModal = () => {
    // Call the close() method on the modal dialog
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.close();
    }
  };
  return (
    <div className="w-full h-full items-center justify-center -mb-36">
      <div className=" translate-x-14 -translate-y-3">
        {/* Open the modal using ID.showModal() method */}
        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          add new admin
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <div className="form-control w-full max-w-xs">
              <label>Profile image</label>
              <label htmlFor="fileUpload" className="relative">
                <img
                  className="w-20 h-20 rounded-full relative object-cover"
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
                  className=" absolute -translate-y-12 opacity-0"
                  disabled=""
                  onChange={handleImageUpload}
                />
              </label>
              <label className="label">
                <span className="label-text">FullName</span>
              </label>
              <input
                type="text"
                placeholder="FullName"
                required={true}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFullName(e.target.value)}
              />
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                required={true}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">
                <span className="label-text">your password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                required={true}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="password"
                placeholder="confirm_password"
                required={true}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
              <label className="label">
                <span className="label-text"></span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                value={Role}
                onChange={(e) => handleSelectChange(e)} // Corrected event handler here
              >
                <option disabled selected value="">
                  Role
                </option>
                <option id="manager_product" value="manager_product">
                  manager_product
                </option>
                <option id="manager_users" value="manager_users">
                  manager_users
                </option>
                <option id="Admin" value="Admin">
                  Admin
                </option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => handleSubmitAdmin()}>
                add
              </button>
              <button className="btn" onClick={() => handleCloseModal()}>
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="flex items-end justify-end  -translate-x-60">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <ListAdmin />
    </div>
  );
};

export default Team;
