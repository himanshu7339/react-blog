import React from 'react'
import Sidebar from './Sidebar'

const Comments = () => {
  return (
    <div className="admin-comments flex">
    <div className="sidebar-container">
      <Sidebar />
    </div>
    <div className="comments-container">
      <div>Comments</div>
    </div>
  </div>
  )
}

export default Comments