import React from 'react';
import { useAuth } from '../context/Auth';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = (props) => {

    const { isAuth } = useAuth();

    // return (
    //     <Route {...rest} render={(props) => {
    //         if (isAuth)
    //             <Component {...props} />;
    //         else
    //             return <Redirect to="/login"/>
    //     }} />
    // );

    return isAuth.loggedIn ?
        (<Route {...props} />) :
        <Redirect to="/login" />;
};

export default ProtectedRoute;