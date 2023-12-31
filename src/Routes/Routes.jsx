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
import Payment from "../Components/Student/Payment";
import ConfirmedClasses from "../Components/Student/ConfirmedClasses";
import PaymentHistory from "../Components/Student/PaymentHistory";
import AllPayments from "../Components/Admin/AllPayments";
import AdminRoutes from "./AdminRoutes";
import InstructorsRoutes from "./InstructorsRoutes";
import NotFound from "../Components/NotFound";
import UpdateClasses from "../Components/Instructor/UpdateClasses";



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
          element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        },
        {
          path: '/dashboard/allUsers',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path: '/dashboard/manageClasses',
          element: <AdminRoutes><ManageClasses></ManageClasses></AdminRoutes>
        },
        {
          path: '/dashboard/allPayments',
          element: <AdminRoutes><AllPayments></AllPayments></AdminRoutes>
        },

        // instructors routes
        {
          path: '/dashboard/instructorHome',
          element: <InstructorsHome></InstructorsHome>
        },
        {
          path: '/dashboard/addClass',
          element:<InstructorsRoutes> <AddClass></AddClass></InstructorsRoutes>
        },
        {
          path: '/dashboard/instructorClasses',
          element:<InstructorsRoutes> <InstructorClasses></InstructorClasses></InstructorsRoutes>
        },
        {
          path: '/dashboard/updateClass/:id',
          element:<InstructorsRoutes><UpdateClasses></UpdateClasses></InstructorsRoutes>
        },

        // student routes /////////////////////////////////////////////////

        {
          path: '/dashboard/studentHome',
          element: <StudentHome></StudentHome>
        },
        {
          path: '/dashboard/bookedClasses',
          element: <BookedClasses></BookedClasses>
        },
        {
          path: '/dashboard/payment/:id',
          element: <Payment></Payment>
        },
        {
          path: '/dashboard/confirmedClasses',
          element: <ConfirmedClasses></ConfirmedClasses>
        },
        {
          path: '/dashboard/paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
      ]
      
    },
    {
      path: '/*',
      element: <NotFound></NotFound>
    }
  ]);