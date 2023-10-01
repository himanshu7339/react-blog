import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { monthNames } from "../../assets/data/monthNames";
import { AiOutlineUser } from "react-icons/ai";
import { capitalizeFLetter } from "../../utils/workFunction";
import DeleteButton from "../common/DeleteButton";
import { Context } from "../..";
import { Navigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import EditModal from "../common/EditModal";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(categories);
  const { user, loading } = useContext(Context);
  console.log(user?.role);
  const getAllCategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/categories`,
      {
        withCredentials: true,
      }
    );

    const categories = await res.data;
    // console.log(categories)
    setCategories(categories);
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  if (loading === false && user?.role !== "admin") {
    console.log(user);
    Navigate({ to: "/" });
  }

  return (
    <div className="admin-users flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {/* <!-- component --> */}
      <div className=" users-container bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold text-xl">Category</h2>
            <span className="text-xs">All Category</span>
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
                      _id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      name
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
                {categories?.categories?.map((category) => {
                  const date = new Date(category.createdAt);
                  const monthIndex = date.getMonth();
                  // Get the month name based on the month index
                  const monthName = monthNames[monthIndex];
                  return (
                    <tbody key={category._id}>
                      <tr key={category._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 ">
                              <AiOutlineUser className="text-lg" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {category._id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {capitalizeFLetter(category.name)}
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
                              <DeleteButton
                                apiKeyword={"category"}
                                id={category._id}
                              >
                                Delete
                              </DeleteButton>
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              <EditModal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                apiKeyword={"category"}
                                categoryId={category._id}
                              />
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

export default Category;
