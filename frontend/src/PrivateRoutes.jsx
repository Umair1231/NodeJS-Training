import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import Cookies from "js-cookie";


export default function PrivateRoutes(){
    const accessToken = Cookies.get("AccessToken")
    return(
        accessToken ? <Outlet /> : <Navigate to="login"/>
    )
}

