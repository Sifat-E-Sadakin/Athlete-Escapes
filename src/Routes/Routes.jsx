import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Blogs from "../Components/Blogs";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import PrivateRoutes from "../Providers/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";
import AllUsers from "../Components/AllUsers";
import Instructors from "../Pages/Instructors";
import AddClass from "../Components/AddClass";
import ManageClasses from "../Components/ManageClasses";
import InstructorClasses from "../Components/Instructor/InstructorClasses";
import Classes from "../Pages/Classes";
import AdminHome from "../Components/Admin/AdminHome";
import InstructorsHome from "../Components/Instructor/InstructorsHome";
import StudentHome from "../Components/Student/StudentHome";
import BookedClasses from "../Components/Student/BookedClasses";


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
        {
          path: "/classes",
          element: <Classes></Classes>,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
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
          path: '/dashboard/instructorHome',
          element: <InstructorsHome></InstructorsHome>
        },
        {
          path: '/dashboard/addClass',
          element: <AddClass></AddClass>
        },
        {
          path: '/dashboard/instructorClasses',
          element: <InstructorClasses></InstructorClasses>
        },

        // student routes /////////////////////////////////////////////////

        {
          path: '/dashboard/studentHome',
          element: <StudentHome></StudentHome>
        },
        {
          path: '/dashboard/bookedClasses',
          element: <BookedClasses></BookedClasses>
        }
      ]
      
    },
    {
      path: '/*',
      element: <ErrorPage></ErrorPage>
    }
  ]);