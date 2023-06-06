import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home";
import Blogs from "../Components/Blogs";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import PrivateRoutes from "../Providers/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
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
      ],
    },
    {
      path: '/*',
      element: <ErrorPage></ErrorPage>
    }
  ]);