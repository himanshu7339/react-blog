import React from 'react'
import { Link } from 'react-router-dom'

const UpdatePostButton = ({postId}) => {
  return (
    <Link to={`/admin/update-post/${postId}`}>Update</Link>
  )
}

export default UpdatePostButton