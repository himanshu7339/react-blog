import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { capitalizeFLetter } from "../../utils/workFunction";
import { Context } from "../..";
import { monthNames } from "../../assets/data/monthNames";
import { Navigate } from "react-router-dom";
import DeleteButton from "../common/DeleteButton";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import UpdatePostButton from "../common/UpdatePostButton";

const Posts = () => {
  const { loading, user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const getAllAdminPosts = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/posts`,
      {
        withCredentials: true,
      }
    );

    const { posts } = await res.data;
    setPosts(posts);
  };
  useEffect(() => {
    getAllAdminPosts();
  }, []);

  if (user?.role === "user") {
    console.log(loading);
    Navigate({ to: "/" });
  }

 
  return (
    <div className="admin-posts flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      {/* <!-- component --> */}
      <div className=" users-container bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold text-xl">Posts</h2>
            <span className="text-xs">All Posts</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="text"
                name=""
                id=""
                placeholder="search users..."
              />
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Reading Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      created At
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>

                {posts?.map((post) => {
                  const date = new Date(post.createdAt);
                  const monthIndex = date.getMonth();
                  // Get the month name based on the month index
                  const monthName = monthNames[monthIndex];

                  // that for content
                  const contentWord = post.content.split(/\s+/);
                  const shortContent = contentWord.slice(0, 20).join(" ");
                  const textOnly = shortContent.replace(/<[^>]+>/g, "");

                  // that for title
                  const titleWord = post.title.split(/\s+/);
                  const shortTitle = titleWord.slice(0, 8).join(" ");
                  return (
                    <tbody key={post._id}>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 ">
                              <BsFillFileEarmarkPostFill className="text-lg" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {capitalizeFLetter(post.category.name)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {capitalizeFLetter(shortTitle)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {capitalizeFLetter(textOnly)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {`${capitalizeFLetter(post.readingTime)} Min`}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0  opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{`${date.getDate()} ${monthName} ${date.getFullYear()}`}</span>
                          </span>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-500 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              <DeleteButton apiKeyword={"post"} id={post._id}>Delete</DeleteButton>
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-700 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              <UpdatePostButton postId={post._id}>Delete</UpdatePostButton>
                            </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
