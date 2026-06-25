import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getVendorBookings = () => {
  return axios.get(`${BASE_URL}/api/vendor-bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const confirmBooking = (id) => {
  return axios.patch(
    `${BASE_URL}/api/confirm-booking/${id}`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const cancelBooking = (id) => {
  return axios.patch(
    `${BASE_URL}/api/vendor-cancel-booking/${id}`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const completeBooking = (id) => {
  return axios.patch(
    `${BASE_URL}/api/complete-booking/${id}`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const getReviews = (serviceId) => {
  return axios.get(`${BASE_URL}/api/service-reviews/${serviceId}`);
};
