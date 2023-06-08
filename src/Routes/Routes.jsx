import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Blogs from "../Components/Blogs";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import PrivateRoutes from "../Providers/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";
import AdminHome from "../Components/AdminHome";
import AllUsers from "../Components/AllUsers";
import Instructors from "../Pages/Instructors";
import AddClass from "../Components/AddClass";
import ManageClasses from "../Components/ManageClasses";
import InstructorClasses from "../Components/Instructor/InstructorClasses";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        {
          path: "/blog",
          element: <PrivateRoutes><Blogs></Blogs></PrivateRoutes>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/instructors",
          element: <Instructors></Instructors>,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        // admin routes
        {
          path: '/dashboard/adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: '/dashboard/allUsers',
          element: <AllUsers></AllUsers>
        },
        {
          path: '/dashboard/manageClasses',
          element: <ManageClasses></ManageClasses>
        },

        // instructors routes
        {
          path: '/dashboard/addClass',
          element: <AddClass></AddClass>
        },
        {
          path: '/dashboard/instructorClasses',
          element: <InstructorClasses></InstructorClasses>
        },
      ]
      
    },
    {
      path: '/*',
      element: <ErrorPage></ErrorPage>
    }
  ]);