import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavSide from "../NavSide/NavSide";
import { Stack } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

function Layout(){
    return(
        <Stack >
            <Navbar/>
            <Stack direction={"row"}>
                <Sidebar/>
                <Outlet/>
            </Stack>
            
        </Stack>
    )
}

export default Layout