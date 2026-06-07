import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import CartegoryCard from "../Components/CartegoryCard.jsx";
import Body from "../Components/Body.jsx";
import Signup from "../Pages/Signup.jsx";
import Login from "../Pages/Login.jsx";
import Services from "../Pages/Services.jsx";
import AllCategories from "../Pages/AllCategories.jsx";
import ServiceDetail from "../Pages/ServiceDetail.jsx";
import MyBooking from "../Pages/MyBooking.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "/category",
        element: <CartegoryCard />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/categories",
        element: <AllCategories />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetail />
      },
      {
        path: "/my-bookings",
        element: <MyBooking />
      }
    ],
  },
]);

export default appRouter;
