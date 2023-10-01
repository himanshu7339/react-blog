import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditModal = ({ isOpen, setIsOpen, apiKeyword, categoryId }) => {
  const [category, setCategory] = useState("");
  console.log(category);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/${apiKeyword}/${categoryId}`,
        {
          name: category,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = await res.data;
      console.log(data);

      if (data.success === false) {
        return toast.error(data.message);
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
      toast.success(data.message);
    } catch (error) {}
  };

  return (
    <>
      {isOpen ? (
        <div>
          <form
            className="flex justify-center items-center rounded-sm flex-row gap-2 transition-all"
            onSubmit={updateHandler}
          >
            <input
              className="p-1"
              placeholder="Update"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Update</button>
            <button className="text-red-600" onClick={() => setIsOpen(false)}>
              X
            </button>
          </form>
          {/* <button onClick={() => setIsOpen(false)}>close</button> */}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)}>Edit</button>
      )}
    </>
  );
};

export default EditModal;
