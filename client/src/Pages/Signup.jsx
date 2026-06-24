import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
   const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!name || !email || !phone || !password || !role) {
        alert("All fields are required");
      }
      const newUser = {
        name,
        email,
        phone,
        password,
        role,
      };

      const response = await axios.post(`${BASE_URL}/user/register`, newUser);
      if (response.status === 200) {
        alert("Signup successfull");
      } else {
        alert("signup failed. Please try again...");
      }
      navigate("/login");
    } catch (error) {
      alert(error.response?.data)
    } finally {
      setLoading(false);
    }
  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Signup
          </h1>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="number"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
      </div>
    );
  };
export default Signup;
