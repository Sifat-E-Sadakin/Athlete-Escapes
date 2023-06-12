import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { userAuth } from '../Providers/UserProvider';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {

    let { logOut, user } = useContext(userAuth)

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
    
      // update state on toggle
      const handleToggle = (e) => {
        if (e.target.checked) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      };
    
      // set theme state in localstorage on mount & also update localstorage on state change
      useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        // add custom data-theme attribute to html tag required to update theme using DaisyUI
        document.querySelector("html").setAttribute("data-theme", localTheme);
      }, [theme]);

    let item = <>
        <li><NavLink className='focus:bg-gray-500 ' to={'/'}>Home</NavLink></li>
        <li><NavLink className='focus:bg-gray-500 '  to={'/instructors'}>Instructors</NavLink></li>
        <li><NavLink className='focus:bg-gray-500 ' to={'/classes'}>Classes</NavLink></li>
        {user && <li><Link className='focus:bg-gray-500 ' to={'/dashboard'}>Dashboard</Link></li>}

        <li><Link className='focus:bg-gray-500 ' to={'/blogs'}>Blogs</Link></li>

        {/* <li><Link to={'/SignUp'}>Sign Up</Link></li> */}
        {user ? <li><button onClick={logOut}>Sign Out</button></li> : <></>}
        <button className="btn btn-square btn-md btn-ghost bg-slate-50">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <img src='https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-1024.png' alt="light" className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
            <img src='https://cdn1.iconfinder.com/data/icons/bootstrap-fill-vol-2/16/moon-stars-fill-1024.png' alt="dark" className="w-8 h-8 swap-off" />
          </label>
        </button>
    </>
    return (
        <div className='sticky top-0 z-50 bg-white  md:bg-black md:bg-opacity-80  md:text-white'>
            <div className="navbar  container mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="a menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {item}
                        </ul>
                    </div>
                    <div>
                      <Link to={'/'}>  <a className="btn btn-ghost normal-case text-lg md:text-xl">Athlete Escapes</a></Link>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="a menu menu-horizontal px-1">
                        {item}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <p className='mr-5'>Hi, <span className='font-semibold'>{user?.displayName}</span></p>}
                    {user ?

                        <div className="avatar online">
                            <div className="w-14 rounded-full">

                                <img src={user?.photoURL} />
                            </div>
                        </div> :
                        <Link className='btn btn-primary btn-md' to={'/login'}>Login</Link>}
                </div>
            </div>

        </div>
    );
};

export default Navbar;