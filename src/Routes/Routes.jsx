import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Blogs from "../Components/Blogs";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import PrivateRoutes from "../Providers/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";


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
      ],
    },
    {
      path: '/*',
      element: <ErrorPage></ErrorPage>
    }
  ]);