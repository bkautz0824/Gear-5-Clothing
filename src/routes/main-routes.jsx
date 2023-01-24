import { useRoutes, Navigate, } from "react-router-dom";
import * as React from 'react';
import Home from "../views/Home";
import Shopping from "../views/Shopping";
import Cart from "../views/Cart";
import ProductPage from "../views/ProductPage";
import Login from "../views/Login";

const MainRoutes = ({user}) => {
    // Check if user is currently logged in, if not redirect to login page
    return useRoutes([
        {
            path: '/cart',
            element: <Cart user={user}/>
        },
        {
            path: '/shopping',
            element: <Shopping user={user}/>
        },
        {
            path: '/:id',
            element: <ProductPage user={user}/>
        },
        {
            path: '/',
            // Important: If user is not logged in, redirect to Login page
            element: <Home user={user}/>
        },
        {
            path: '/login',
            element: <Login user={user}/> 
        }
    ])
}
 
export default MainRoutes;