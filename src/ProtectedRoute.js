import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({userType, allowedUserTypes}) => {
    let auth = allowedUserTypes.includes(userType);
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute