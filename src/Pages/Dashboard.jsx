import React from 'react';
import Navbar from '../Components/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';

const Dashboard = () => {

    let {isAdmin} = useAdmin();
    let {isInstructor} = useInstructor();

    // console.log(isInstructor.isInstructor);
    // console.log(isAdmin.isAdmin);

    let CheckAdmin = isAdmin?.isAdmin;
    let checkInstructor = isInstructor?.isInstructor; 
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-20">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {
                        CheckAdmin?
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to={'/dashboard/adminHome'}>Admin Home</Link></li>
                        <li><Link to={'/dashboard/allUsers'}>All Users</Link></li>
                        <li><Link to={'/dashboard/manageClasses'}>Manage Classes</Link></li>
                        <li><Link to={'/dashboard/allPayments'}>ALL Payments</Link></li>

          
                  
                    </ul>:
                    checkInstructor?
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link to={'/dashboard/instructorHome'}>Instructor Home</Link></li>
                    <li><Link to={'/dashboard/addClass'}>Add Class</Link></li>
                    <li><Link to={'/dashboard/instructorClasses'}>My Classes</Link></li>
                    </ul>
                    :
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to={'/dashboard/studentHome'}>Home</Link></li>
                        <li><Link to={'/dashboard/bookedClasses'}>Booked Classes</Link></li>
                        <li><Link to={'/dashboard/confirmedClasses'}>Confirmed Classes</Link></li>
                        <li><Link to={'/dashboard/paymentHistory'}>Payment History</Link></li>
                        
                    </ul>
                    }

                </div>
            </div>
        </div>
    );
};

export default Dashboard;