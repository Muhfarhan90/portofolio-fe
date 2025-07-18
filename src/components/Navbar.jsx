import React from "react";
import profil from "../assets/profil.png";
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl">
            <img
              src={profil}
              alt=""
              className="w-10 h-10 bg-yellow-400 rounded-full"
            />
            FARHAN
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Projects</a>
            </li>
            <li>
              <a href="">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
