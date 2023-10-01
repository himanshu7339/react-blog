import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { monthNames } from "../../assets/data/monthNames";
import { capitalizeFLetter } from "../../utils/workFunction";


const BlogDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [pageTitle, setPageTitle] = useState("");
  const getSinglePost = async (postId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/${postId}`,
        {
          withCredentials: true,
        }
      );
      const { post } = await res.data;
      setPost(post);
      setPageTitle(post.title);
    } catch (error) {}
  };
  useEffect(() => {
    getSinglePost(postId);
  }, [postId]);

  const date = new Date(post.createdAt);
  const monthIndex = date.getMonth();
  // Get the month name based on the month index
  const monthName = monthNames[monthIndex];
  document.title = pageTitle;
  return (
    // <!-- component -->
    <Fragment>
      <div className="max-w-screen-lg mx-auto">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                {post.title}
              </h2>
              <div className="flex items-center justify-between">
                <Link
                  to={`/${post?.category?.name}`}
                  className="py-2 inline-flex items-center justify-center mb-2 text-lg"
                >
                  {`${post?.category?.name}`}
                </Link>

                {/* time and data */}
                <p className="text-start text-sm lg:mb-3 font-semibold ">
                  {`${date.getDate()} ${monthName} ${date.getFullYear()}`}{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {post.readingTime} min read
                  </span>
                </p>
              </div>
            </div>

            <img
              alt="blogDetails"
              src={post.image}
              className="w-full object-cover lg:rounded"
              sy
              style={{ height: "28em" }}
            />
          </div>

          <div
            className="flex flex-col lg:flex-row lg:space-x-12 content mt-8 "
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <img
                  alt="imag"
                  src="https://randomuser.me/api/portraits/men/97.jpg"
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    {" "}
                    Mike Sullivan{" "}
                  </p>
                  <p className="font-semibold text-gray-600 text-xs">
                    {" "}
                    Editor{" "}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 py-3">
                Mike writes about technology Yourself required no at thoughts
                delicate landlord it be. Branched dashwood do is whatever it.
              </p>
              <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                Follow
                <i className="bx bx-user-plus ml-2"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default BlogDetails;
