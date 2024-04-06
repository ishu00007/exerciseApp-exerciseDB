import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavSide from "../NavSide/NavSide";
import { Stack } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

function Layout(){
    return(
        <>
            <Navbar/>
            <Stack direction={"row"} overflow={"hidden"} >
                <Sidebar/>
                <Outlet/>
            </Stack>
            
        </>
    )
}

export default Layout