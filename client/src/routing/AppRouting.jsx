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
import ReviewForm from "../Pages/ReviewForm.jsx";
import NotFound from "../Components/NotFound.jsx";

import ProtectedVendorRoute from "../Components/ProtectedVendorRoute.jsx";
import ProtectedUserRoute from "../Components/ProtectedUserRoute.jsx";
import About from "../Pages/About.jsx";

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

      // USER ROUTES
      {
        path: "/my-bookings",
        element: (
          <ProtectedUserRoute>
            <MyBooking />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "/add-review/:bookingId",
        element: (
          <ProtectedUserRoute>
            <ReviewForm />
          </ProtectedUserRoute>
        ),
      },

      // VENDOR ROUTES
      {
        path: "/vendor/dashboard",
        element: (
          <ProtectedVendorRoute>
            <VendorDashboard />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "/vendor/create-service",
        element: (
          <ProtectedVendorRoute>
            <CreateService />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "/vendor/services",
        element: (
          <ProtectedVendorRoute>
            <VendorServices />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "/vendor/edit-service/:id",
        element: (
          <ProtectedVendorRoute>
            <EditServiceForm />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "/vendor/bookings",
        element: (
          <ProtectedVendorRoute>
            <VendorPendingBookings />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: '/about',
        element: <About />
      }
      ,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default appRouter;
