import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import LoginImage from "../../assets/Image/loginImage.jpg";
import { toast } from "react-toastify";
import { Context } from "../..";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
          }),
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setIsAuthenticated(false);
        return toast.error(data.message);
      }
      toast.success(data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  };

  if(isAuthenticated) return navigate("/")
  return (
    // <!-- component -->
    <div class="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div class="w-1/2 h-screen hidden lg:block">
        <img
          src={LoginImage}
          alt="Placeholder"
          class="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Signup</h1>
        <form onSubmit={submitHandler}>
          {/* <!-- Username Input --> */}
          <div class="mb-4">
            <label for="username" class="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
            />
          </div>
          <div class="mb-4">
            <label for="username" class="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div class="mb-4">
            <label for="password" class="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
            />
          </div>
          {/* <!-- confirm password Input --> */}
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
            />
          </div>
          {/* <!-- Remember Me Checkbox --> */}
          {/* <div class="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" class="text-blue-500"/>
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div> */}
          {/* <!-- Forgot Password Link --> */}
          <div class="mb-6 text-blue-500">
            <Link href="#" class="hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* <!-- Login Button --> */}
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Signup
          </button>
        </form>
        {/* <!-- Sign up  Link --> */}
        <div class="mt-6 text-blue-500 text-center">
          <Link to={"/signup"} class="hover:underline">
            If you have already account please login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
