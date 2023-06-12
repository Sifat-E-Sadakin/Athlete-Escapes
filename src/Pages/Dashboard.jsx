import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Link, NavLink, Navigate, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import { Triangle } from 'react-loader-spinner';
import AdminHome from '../Components/Admin/AdminHome';
import Footer from '../Components/Footer';
import { FaAngleDoubleRight, FaBook, FaBookmark, FaHistory, FaHome, FaList, FaPlug, FaPlus, FaUserAlt, FaUsers, FaWallet } from 'react-icons/fa';
import { userAuth } from '../Providers/UserProvider';
import { Helmet } from 'react-helmet';

const Dashboard = () => {

    let { isAdmin } = useAdmin();
    let { isInstructor } = useInstructor();
    const navigation = useNavigation();
    // console.log(isInstructor.isInstructor);
    // console.log(isAdmin.isAdmin);
    let go = useNavigate()
    let {user} = useContext(userAuth)


    let CheckAdmin = isAdmin?.isAdmin;

    let checkInstructor = isInstructor?.isInstructor;

   
    return (
        <div className=''>
            <Helmet>
                <title>{user.displayName} | Athlete Escapes</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className=" drawer-content mt-20">
                    {/* Page content here */}
                    <div className='spinner'>
                        {navigation.state == 'loading' ? <Triangle
                            height="300"
                            width="300"
                            color="#000000"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : <></>}
                    </div>
                    {CheckAdmin && <Navigate to={'/dashboard/adminHome'}></Navigate>}
                    {checkInstructor && <Navigate to={'/dashboard/instructorHome'}></Navigate>}
                    {!CheckAdmin && !checkInstructor ? <Navigate to={'/dashboard/studentHome'}></Navigate>:<></> }
                    <Outlet></Outlet>
                    
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {
                        CheckAdmin ?
                            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content ">
                                {/* Sidebar content here */}
                                <p className='mt-14 flex gap-3 items-center'> <FaHome></FaHome><NavLink to={'/dashboard/adminHome'}>Admin Home</NavLink></p>
                                <p className='mt-3 flex gap-3 items-center'> <FaUsers></FaUsers><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></p>
                                <p className='mt-3 flex gap-3 items-center'> <FaAngleDoubleRight></FaAngleDoubleRight> <NavLink to={'/dashboard/manageClasses'}>Manage Classes</NavLink></p>
                                <p className='mt-3 flex gap-3 items-center'> <FaWallet></FaWallet> <NavLink to={'/dashboard/allPayments'}>ALL Payments</NavLink></p>



                            </ul> :
                            checkInstructor ?
                                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                                    {/* Sidebar content here */}
                                    <p className='mt-14 flex gap-3 items-center'> <FaHome></FaHome><NavLink to={'/dashboard/instructorHome'}>Instructor Home</NavLink></p>
                                    <p className='mt-3 flex gap-3 items-center'> <FaPlus></FaPlus><NavLink to={'/dashboard/addClass'}>Add Class</NavLink></p>
                                    <p className='mt-3 flex gap-3 items-center'> <FaList></FaList><NavLink to={'/dashboard/instructorClasses'}>My Classes</NavLink></p>
                                </ul>
                                :
                                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                                    {/* Sidebar content here */}
                                    <p className='mt-14 flex gap-3 items-center'> <FaHome></FaHome><NavLink to={'/dashboard/studentHome'}>Home</NavLink></p>
                                    <p className='mt-3 flex gap-3 items-center'> <FaBookmark></FaBookmark><NavLink to={'/dashboard/bookedClasses'}>Booked Classes</NavLink></p>
                                    <p className='mt-3 flex gap-3 items-center'> <FaWallet></FaWallet><NavLink to={'/dashboard/confirmedClasses'}>Confirmed Classes</NavLink></p>
                                    <p className='mt-3 flex gap-3 items-center'> <FaHistory></FaHistory><NavLink to={'/dashboard/paymentHistory'}>Payment History</NavLink></p>

                                </ul>
                    }

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;