import React from 'react';

const Avatar = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://styles.redditmedia.com/t5_89nn9a/styles/profileIcon_snooc419f8d2-fd71-4192-8c1c-ed20a725a0e4-headshot.png?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&v=enabled&s=23e178ea957c52d8a138bd42cd80d80cb2de4beb" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
