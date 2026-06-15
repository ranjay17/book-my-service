import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Body from "../Components/Body.jsx";
import Signup from "../Pages/Signup.jsx";
import Login from "../Pages/Login.jsx";
import Services from "../Pages/Services.jsx";
import ServiceDetail from "../Pages/ServiceDetail.jsx";
import MyBooking from "../Pages/MyBooking.jsx";
import VendorDashboard from "../Components/VendorDashboard.jsx";
import CreateService from "../Pages/CreateService.jsx";
import VendorServices from "../Pages/VendorServices.jsx";
import EditServiceForm from "../Pages/EditServiceForm.jsx";
import VendorPendingBookings from "../Pages/VendorPendingBookings.jsx";

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
        path: "/service/:id",
        element: <ServiceDetail />,
      },
      {
        path: "/my-bookings",
        element: <MyBooking />,
      },
      {
        path: "/vendor/dashboard",
        element: <VendorDashboard />,
      },
      {
        path: "/vendor/create-service",
        element: <CreateService />
      },
      {
        path: '/vendor/services',
        element: <VendorServices />
      },
      {
        path: '/vendor/edit-service/:id',
        element: <EditServiceForm />
      },
      {
        path:"/vendor/pending-bookings",
        element: <VendorPendingBookings />
      }
    ],
  },
]);

export default appRouter;
