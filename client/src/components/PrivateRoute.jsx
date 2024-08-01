import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


function PrivateRoute() {
    const { currentUser } = useSelector( store => store.user );
  return currentUser ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute