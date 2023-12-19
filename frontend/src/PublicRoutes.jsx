import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import Cookies from "js-cookie";


export default function PublicRoutes(){
    const accessToken = Cookies.get("AccessToken")
    return(
        accessToken ? <Navigate to={'/starwars'}/> : <Outlet/>
    )
}

