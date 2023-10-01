import cookies from "js-cookie"
import { useContext } from "react";
import { Navigate } from 'react-router-dom'
import { Context } from "../..";
const ProtectedRoute = ({children}) => {
  const {user} = useContext(Context)
  console.log(user?.role)
  const token = cookies.get("token");
  console.log(token)

  if(token&& user?.role==="admin"){
    return children
  }else {
    return Navigate({to:"/login"})
  }
    
}

export default ProtectedRoute