import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const DeleteButton = ({ children, id, apiKeyword }) => {
  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/${apiKeyword}/${id}`,{
          withCredentials:true
        }
      );
      const data = await res.data;
      console.log(data);

        if (data.success === false) {
          return toast.error(data.message);
        }
        toast.success(data.message);
    } catch (error) {}
  };

  return (
    <div className="delete-button" onClick={() => deleteHandler(id)}>
      {children}
    </div>
  );
};

export default DeleteButton;
