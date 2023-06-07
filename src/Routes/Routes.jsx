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

        // instructors routes
        {
          path: '/dashboard/addClass',
          element: <AddClass></AddClass>
        }
      ]
      
    },
    {
      path: '/*',
      element: <ErrorPage></ErrorPage>
    }
  ]);