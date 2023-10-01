import React from "react";
import Sidebar from "./Sidebar";
import WritePost from "./Write";

const Dashboard = () => {
  return (
    <div className="Dashboard flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      
        <WritePost/>
      
    </div>
  );
};

export default Dashboard;
