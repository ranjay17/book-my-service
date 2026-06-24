import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const EditServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const services = useSelector((store) => store.service.service);
  const service = services.find((item) => item._id === id);
  const[title, setTitle] = useState(service?.title);
  const[description, setDescription] = useState(service?.description);
  const[price, setPrice] = useState(service?.price);
  const[category, setCategory] = useState(service?.category);
  const[image, setImage] = useState(service?.image);
  const[location, setLocation] = useState(service?.location);
  const [loading, setLoading] = useState(false);

  const handleUpdateService = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updatedService = {
        title,
        description,
        price,
        category,
        image,
        location,
      };

      const response = await axios.patch(
        `${BASE_URL}/vendor/update-service/${service._id}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.status === 200) {
        alert("Service Updated Successfully");
        setLoading(false);
        navigate("/vendor/services");
      }
    } catch (error) {
      alert(error.response?.data || "Service Not Updated");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-2">
          Edit Service
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Update your service details below.
        </p>

        <form className="space-y-6" onSubmit={handleUpdateService}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Service Title
            </label>
            <input
              type="text"
              placeholder="Enter service title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              rows="5"
              placeholder="Enter service description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>

              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Beauty">Beauty</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Home Shifting">Home Shifting</option>
                <option value="Appliance Repair">Appliance Repair</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Updating Service..." : "Update Service"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/vendor/services")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceForm;
