import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Body from "../Components/Body.jsx";
import Signup from "../Components/Signup.jsx";
import Login from "../Components/Login.jsx";
import Services from "../Pages/user/Services.jsx";
import ServiceDetail from "../Pages/user/ServiceDetail.jsx";
import MyBooking from "../Pages/user/MyBooking.jsx";
import VendorDashboard from "../Pages/vendor/VendorDashboard.jsx";
import CreateService from "../Pages/vendor/CreateService.jsx";
import VendorServices from "../Pages/vendor/VendorServices.jsx";
import EditServiceForm from "../Pages/vendor/EditServiceForm.jsx";
import VendorPendingBookings from "../Pages/vendor/VendorPendingBookings.jsx";
import ReviewForm from "../Pages/user/ReviewForm.jsx";
import NotFound from "../Components/NotFound.jsx";

import ProtectedVendorRoute from "../Components/ProtectedVendorRoute.jsx";
import ProtectedUserRoute from "../Components/ProtectedUserRoute.jsx";
import About from "../Components/About.jsx";

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
