import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogin(true)
    try {
      if (!email || !password) {
        return alert("All fields are required");
      }

      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        alert("Login Successful");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        dispatch(addUser(response.data.user));
        navigate("/");
        setIsLogin(false)
      }
    } catch (error) {
      console.log(error);
      alert("login failed");
      setIsLogin(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {isLogin ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
