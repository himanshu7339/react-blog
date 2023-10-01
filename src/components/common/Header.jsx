import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { toast } from "react-toastify";

function Header() {
  const { isAuthenticated,setIsAuthenticated,user } = useContext(Context);

  const navigate = useNavigate();

  //   const { sections, title } = props;
  const navlinks = [
    { title: "Python", url: "http://www.python.org" },
    { title: "JavaScript", url: "http://www.python.org" },
    { title: "C++", url: "http://www.python.org" },
    { title: "Java", url: "http://www.python.org" },
    { title: "React", url: "http://www.python.org" },
  ];

  useEffect(() => {
    // This effect will run whenever the 'user' object changes.
    // You can add code here that depends on the 'user' object.
    // For example, you can check the user's role and update component behavior accordingly.
    if (user?.role === "admin") {
    
      // Do something for admin users
    } else {
      // Do something for other users
    }
  }, [user]);
  

  const logoutHandler = async (e) => {
   
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,
        {
          method: "GET",
          credentials:"include"
          
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setIsAuthenticated(true);
        return toast.error(data.message);
      }
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true);
    }
  };

  return (
    // <!-- component -->
    <header className={` ${user?.role === "admin" ? "invisible":"visible"}header sticky top-0 bg-white shadow-md flex items-center justify-between pl-5 pr-5 z-10 `}>
      {/* <!-- logo --> */}
      <h1>
        <Link to={"/"}>
          <h1 className="font-bold text-lg">React Blog</h1>
        </Link>
      </h1>

      {/* <!-- navigation --> */}
      <nav className="nav  text-">
        <ul className="flex items-center">
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to={"/contact"}>Contact</Link>
          </li>
          {
            user?.role === "admin" ? (<li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
          </li>) :(<li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <Link to={"/admin/dashboard"}>use Profile</Link>
          </li>)
          }
          
        </ul>
      </nav>

      {isAuthenticated === true ? (
        
          <button onClick={logoutHandler} className="group relative h-10 w-20 overflow-hidden rounded-2xl bg-green-500 text-sm font-bold text-white">
            Logout
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
      
      ) : (
        <Link to={"/login"}>
          <button className="group relative h-10 w-20 overflow-hidden rounded-2xl bg-green-500 text-sm font-bold text-white">
            Login
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
        </Link>
      )}
    </header>
  );
}
export default Header;
