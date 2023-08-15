import React from "react";
import { useSelector } from "react-redux";

const NavbarAdmin = () => {
  const admin = useSelector((state) => state.user.user);

  return (
    <div className="flex items-center justify-end min-w-screen h-24 bg-neutral-focus p-5 overflow-hidden">
      <div className="flex justify-center gap-5 z-30 drop-shadow-lg h-full">
        {/* Search Input */}
        <div className="flex items-center">
          <input
            type="search"
            className="rounded border p-2 w-96 outline-none bg-transparent"
            placeholder="Search"
            aria-label="Search"
          />
          <span className=" flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1.5em"
              width="1.5em"
              className="cursor-pointer"
            >
              <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
            </svg>
          </span>
        </div>

        {/* Sun and Moon Icons */}
        <div className="flex items-center">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* sun icon */}
            <svg
              className="swap-on fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              color="black"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              color="black"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Bell Icon */}
        <div className="flex items-center">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
            color="black"
            className="cursor-pointer"
          >
            <path d="M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zM400 288v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48z" />
          </svg>
        </div>
        {/* Profile Dropdown */}
        <div className="dropdown dropdown-left flex items-center relative">
          <label tabIndex={0}>
            {/* Profile Image */}
            <img
              src={admin.img_Profile}
              alt="profileimage"
              className="w-10 h-10 rounded-full object-cover"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
