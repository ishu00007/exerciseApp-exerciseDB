import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Stack } from "@mui/material";

function NavSide(){
    return(
        <Stack direction={"column"}>
            <Navbar/>
            <Sidebar/>
        </Stack>
    )
}

export default NavSide