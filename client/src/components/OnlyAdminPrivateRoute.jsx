import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


function OnlyAdminPrivateRoute() {
    const { currentUser } = useSelector( store => store.user );
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/signin" />
}

export default OnlyAdminPrivateRoute