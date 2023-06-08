import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userAuth } from '../Providers/UserProvider';

const Navbar = () => {

    let { logOut, user } = useContext(userAuth)
    let item = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/instructors'}>Instructors</Link></li>
        <li><Link to={'/classes'}>Classes</Link></li>
        <li><Link to={'/dashboard'}>Dashboard</Link></li>

        <li><Link to={'/blogs'}>Blogs</Link></li>

        <li><Link to={'/SignUp'}>Sign Up</Link></li>
        <li><button onClick={logOut}>Sign Out</button></li>
    </>
    return (
        <div className='sticky top-0 z-50 bg-black bg-opacity-70  md:text-white'>
            <div className="navbar  container mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {item}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Athlete Escapes</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
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