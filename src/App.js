import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./components/page/Home";
import BlogDetails from "./components/page/BlogDetails";
import Blogs from "./components/page/Blogs";
import Login from "./components/page/Login";
import Footer from "./components/common/Footer";
import Signup from "./components/page/Signup";
import Contact from "./components/page/Contact";
import About from "./components/page/About";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/dashboard/Users";
import Posts from "./components/dashboard/Posts";
import Comments from "./components/dashboard/Comments";
import Error from "../src/components/page/Error";
import Toast from "./components/common/Toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./index";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import WritePost from "./components/dashboard/Write";
import Category from "./components/dashboard/Category";
import UpdatePost from "./components/dashboard/UpdatePost";

function App() {
  const { setIsAuthenticated, setUser, setLoading } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setIsAuthenticated(false);
      });
  }, [setIsAuthenticated, setUser, setLoading]);
  return (
    <BrowserRouter>
      <Toast />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:postId" element={<BlogDetails />} />
        <Route path="/blogs/" element={<Blogs />} />
        {/* <Route path="/products/:keyword" element={<Products />}/> */}
        {/* <Route path="/search" element={<Search />}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Administrator Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><WritePost /></ProtectedRoute>} />
        <Route path="/admin/update-post/:postId" element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} />
        <Route path="/admin/comments" element={<Comments />} />
        {/* <-----------------------------------------------------> */}

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
