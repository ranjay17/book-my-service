
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addService } from "../redux/serviceSlice";
import { BASE_URL } from "../utils/constants";

const CreateService = () => {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState("");
    const[image, setImage] = useState('');
    const[category, setCategory] = useState('');
    const[location, setLocation] = useState('');
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleAddService = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            if(!title || !description || !price || !image || !category || !location){
                alert("All fields are required")
                setLoading(false);
                return
            }
            const newService = {title, description, price, image, category, location};
            const response = await axios.post(
              `${BASE_URL}/vendor/create-service`,
              newService,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );
            if(response.status === 200){
                alert("service created")
                setLoading(false)
            }else{
                alert("service not created")
                setLoading(false)
            }
            dispatch(addService(response.data.newService))
            navigate("/vendor/dashboard");
        } catch (error) {
            alert("service not created")
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl"
        onSubmit={handleAddService}
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create Service
        </h1>
        <input
          type="text"
          placeholder="Service Title"
          className="w-full border p-3 rounded-lg mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Service Description"
          rows="4"
          className="w-full border p-3 rounded-lg mb-4 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg mb-4"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg mb-4"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Home Cleaning</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Salon</option>
          <option>Photography</option>
          <option>AC Repair</option>
          <option>Carpenter</option>
          <option>Painting</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded-lg mb-6"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {loading ? "Please Wait..." : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default CreateService;
