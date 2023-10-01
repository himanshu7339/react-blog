import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import axios from "axios";
const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [readingTime, setReadingTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const editor = useRef(null);

  console.log(title, content, image, category, readingTime);

  console.log(category);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/post/create`, {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          image,
          readingTime,
          category,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    } catch (error) {}

    console.log(image);
  };
  // fetch categories
  const getAllCategories = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/categories`,
      {
        withCredentials: true,
      }
    );
    const { categories } = await res.data;
    setCategories(categories);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className=" ml-auto mr-auto">
      <h1 className="text-center font-bold text-2xl">Write Blog Post</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="mt-5 flex flex-col items-center justify-center  ">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {" "}
            Create Blog Title
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="title"
            type="text"
            value={title}
            id="title"
            placeholder="Enter blog title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-col items-center justify-center ">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {" "}
            Write Blog Content
          </label>
          {/* <textarea
         className="w-96 border p-2 font-semibold text-sm"
          required
          name="content"
          value={content}
          id="content"
          placeholder="Write blog content..."
          onChange={(e) => setContent(e.target.value)}
        /> */}
          <div>
            <JoditEditor
              className="w-96 border p-2 font-semibold text-sm"
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center font-semibold ">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Select Category
          </label>
          <select
            class="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category?._id}
          >
             <option selected>Choose Category</option>
            {categories?.map((category) => (
              <option className="text-sm capitalize" key={category._id} value={category._id}>
               
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center font-semibold ">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {" "}
            Upload Image
          </label>
          <input
            className="w-96 border p-2 font-semibold text-sm"
            required
            name="image"
            type="text"
            id="image"
            placeholder="Enter blog image url..."
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-col items-center justify-center font-semibold ">
          <label
            htmlFor="readingTime"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {" "}
            Reading Time in minute
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="readingTime"
            type="number"
            value={readingTime}
            id="readingTime"
            placeholder="Enter blog reading time..."
            onChange={(e) => setReadingTime(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
