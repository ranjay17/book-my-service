import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ReviewForm = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/create-review`,
        {
          bookingId,
          rating,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(res.data.message);

      setLoading(false);

      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to submit review");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Add Review</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block font-semibold mb-2">Rating</label>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Feedback</label>

            <textarea
              rows="5"
              placeholder="Write your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded-lg p-3 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Submitting Review..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
