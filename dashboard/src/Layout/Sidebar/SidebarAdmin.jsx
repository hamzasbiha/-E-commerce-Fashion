import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [DropList, setDropList] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["tokenAdmin"]);
  const [DropSecondList, setDropSecondList] = useState(false);
  const admin = useSelector((state) => state.user.user);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    console.log('hello')
    removeCookie("tokenAdmin");
    
  };
  return (
    <section className="flex flex-col items-center just gap-6  sticky -mt-24 overscroll-none  bg-gradient-to-l from-indigo-500 min-h-screen w-56 ">
      <Link to={"/"}>
        {" "}
        <h1 className="text-white text-3xl mt-10 drop-shadow-xl">Dashboard</h1>
      </Link>
      <Link to={"/profile/:id"}>
        <img
          src={admin.img_Profile}
          alt=" "
          className="rounded-full w-20 h-20 items-center justify-center object-cover"
        />
      </Link>
      <h3 className="text-white  drop-shadow-lg">{admin.FullName}</h3>
      <div className="">
        <Link
          className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md drop-shadow-xl   "
          to={"/"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            color="white"
          >
            <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" />
          </svg>
          <h3 className="text-white">Dashboard</h3>
        </Link>
        <div className="flex items-center     font-medium p-4 btn-square w-full rounded-md text-white">
          <div className="flex items-center ">
            <button className="text-lg">Client</button>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              color="white"
              className={
                !DropSecondList
                  ? `-rotate-90 duration-100 cursor-pointer translate-x-20`
                  : " duration-100  cursor-pointer translate-x-20"
              }
              onClick={() => setDropSecondList(!DropSecondList)}
            >
              <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
            </svg>
          </div>
        </div>

        {DropSecondList ? (
          <div>
            {" "}
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/users"}
            >
              <svg
                viewBox="0 0 18 16"
                fill="currentColor"
                height="1em"
                width="1em"
                color="white"
              >
                <path
                  fill="currentColor"
                  d="M12 12.041v-.825c1.102-.621 2-2.168 2-3.716C14 5.015 14 3 11 3S8 5.015 8 7.5c0 1.548.898 3.095 2 3.716v.825c-3.392.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"
                />
                <path
                  fill="currentColor"
                  d="M5.112 12.427c.864-.565 1.939-.994 3.122-1.256a5.667 5.667 0 01-.633-.922 5.726 5.726 0 01-.726-2.748c0-1.344 0-2.614.478-3.653.464-1.008 1.299-1.633 2.488-1.867C9.577.786 8.873.001 7 .001c-3 0-3 2.015-3 4.5 0 1.548.898 3.095 2 3.716v.825c-3.392.277-6 1.944-6 3.959h4.359c.227-.202.478-.393.753-.573z"
                />
              </svg>
              <h3 className="text-white">User's</h3>
            </Link>
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/orders"}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                color="white"
                width="1em"
              >
                <path d="M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.491.592l-1.5 8A.5.5 0 0113 12H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 110 2 1 1 0 010-2zm7 0a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
              <h3 className="text-white">Order's</h3>
            </Link>
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/products"}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                color="white"
              >
                <path d="M2.97 1.35A1 1 0 013.73 1h8.54a1 1 0 01.76.35l2.609 3.044A1.5 1.5 0 0116 5.37v.255a2.375 2.375 0 01-4.25 1.458A2.371 2.371 0 019.875 8 2.37 2.37 0 018 7.083 2.37 2.37 0 016.125 8a2.37 2.37 0 01-1.875-.917A2.375 2.375 0 010 5.625V5.37a1.5 1.5 0 01.361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 002.75 0 .5.5 0 011 0 1.375 1.375 0 002.75 0 .5.5 0 011 0 1.375 1.375 0 102.75 0V5.37a.5.5 0 00-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 001 5.37v.255a1.375 1.375 0 002.75 0 .5.5 0 011 0zM1.5 8.5A.5.5 0 012 9v6h1v-5a1 1 0 011-1h3a1 1 0 011 1v5h6V9a.5.5 0 011 0v6h.5a.5.5 0 010 1H.5a.5.5 0 010-1H1V9a.5.5 0 01.5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3zm3 0h-2v3h2v-3z" />
              </svg>
              <h3 className="text-white">Product's</h3>
            </Link>
          </div>
        ) : null}
        <div className="flex items-center  gap-24 font-medium p-4 btn-square  w-full rounded-md text-white">
          <div
            className="flex items-center 
          "
          >
            <button className="text-lg drop-shadow-xl">Work</button>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              color="white"
              className={
                !DropList
                  ? `-rotate-90 duration-100 cursor-pointer translate-x-16 `
                  : " duration-100  cursor-pointer translate-x-16"
              }
              onClick={() => setDropList(!DropList)}
            >
              <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
            </svg>
          </div>
        </div>
        {DropList ? (
          <div
            className={
              !DropList
                ? ` ml-36 duration-300 `
                : "scale-120 opacity-100 duration-500"
            }
          >
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/Team"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                color="white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 11a5 5 0 015 5v6H7v-6a5 5 0 015-5zm-6.712 3.006a6.983 6.983 0 00-.28 1.65L5 16v6H2v-4.5a3.5 3.5 0 013.119-3.48l.17-.014zm13.424 0A3.501 3.501 0 0122 17.5V22h-3v-6c0-.693-.1-1.362-.288-1.994zM5.5 8a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm13 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM12 2a4 4 0 110 8 4 4 0 010-8z" />
              </svg>
              <h3 className="text-white">Team</h3>
            </Link>
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/Reports"}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                color=" white"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h5.697M18 14v4h4M18 11V7a2 2 0 00-2-2h-2" />
                <path d="M10 3 H12 A2 2 0 0 1 14 5 V5 A2 2 0 0 1 12 7 H10 A2 2 0 0 1 8 5 V5 A2 2 0 0 1 10 3 z" />
                <path d="M22 18 A4 4 0 0 1 18 22 A4 4 0 0 1 14 18 A4 4 0 0 1 22 18 z" />
                <path d="M8 11h4M8 15h3" />
              </svg>
              <h3 className="text-white">Reports</h3>
            </Link>
            <Link
              className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md"
              to={"/Chat/:"}
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M475.22 206.52c-10.34-48.65-37.76-92.93-77.22-124.68A227.4 227.4 0 00255.82 32C194.9 32 138 55.47 95.46 98.09 54.35 139.33 31.82 193.78 32 251.37a215.66 215.66 0 0035.65 118.76l4.35 6.05L48 480l114.8-28.56s2.3.77 4 1.42 16.33 6.26 31.85 10.6c12.9 3.6 39.74 9 60.77 9 59.65 0 115.35-23.1 156.83-65.06C457.36 365.77 480 310.42 480 251.49a213.5 213.5 0 00-4.78-44.97z" />
              </svg>
              <h3 className="text-white">Chat</h3>
            </Link>
          </div>
        ) : null}
        {/* drop menu for evey thing about user */}

        <span
          className="flex items-center text-sm  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md cursor-pointer"
          onClick={() => logout()}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            color="white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" />
          </svg>
          <h3 className="text-white">Logout</h3>
        </span>
      </div>
    </section>
  );
};

export default SidebarAdmin;
