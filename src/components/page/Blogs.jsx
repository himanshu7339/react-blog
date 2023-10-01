import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../common/BlogCard";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
    const { posts } = await res.data;
    setPosts(posts);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="p-16 ">
      <h1 className="text-3xl font-bold text-center ">All Blogs</h1>
      <div className="blogsList grid grid-cols-1 gap-y-4 justify-center mt-6 md:grid-cols-2 md:gap-x-2 lg:grid-cols-4 lg:gap-x-4 xl:grid-cols-4 xl:gap-x-5 2xl:grid-cols-5">
        {posts?.map((post) => (
          <BlogCard key={post._id} props={post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;