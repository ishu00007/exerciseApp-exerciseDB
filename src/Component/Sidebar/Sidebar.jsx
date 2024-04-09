import React, { useContext, useState } from "react";
import { Autocomplete, Stack, Typography, TextField, MenuItem, Menu, Button, CircularProgress, Divider } from "@mui/material";
import axios from "../../Axios/axios";
import { Link, useParams } from "react-router-dom";
import { exerciseContext } from "../../store/context";

function Sidebar() {
    const { fetchData, exercises, setExercises, setCurrentPage } = useContext(exerciseContext);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = async (value) => {
        sessionStorage.setItem("category", value);
        fetchData(`${value}List`, setSelectedCategory);
        setCurrentPage(1);
        handleClose();
    };

    const handleExerciseOptionClick = async (value) => {
        localStorage.setItem("subCategory", value);
        fetchData(`${sessionStorage.getItem("category")}/${value}`, setExercises);
        setCurrentPage(1);
    };

    if(selectedCategory.length !== 0){
        sessionStorage.setItem("categories" , JSON.stringify(selectedCategory))
    }

    return (
        <Stack maxWidth={200} bgcolor="black" width={200} height={`calc(100vh - 68.5px)`} sx={{ overflowX: "hidden", overflowY: "scroll" }} display={{ xs: "none", lg: "flex" }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
                color="inherit"
                sx={{ m: 3 }}
            >
                {sessionStorage.getItem("category") ? sessionStorage.getItem("category") : <Typography variant="overline">categories</Typography>}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                {["equipment", "bodyPart", "target"].map((item, index) => (
                    <MenuItem key={index} onClick={() => handleSelect(item)}>{item}</MenuItem>
                ))}
            </Menu>
            <Stack>
                {selectedCategory.length === 0 && !sessionStorage.getItem("categories") ? <Typography textAlign={"center"} color="white">no category selected</Typography> : (
                    (sessionStorage.getItem("categories") ? JSON.parse(sessionStorage.getItem("categories")) : selectedCategory).map((item, index) => (
                    <React.Fragment key={index}>
                        <Button variant="text" onClick={() => handleExerciseOptionClick(item)}>
                        <Link to={`/${sessionStorage.getItem("category")}/${item}`}> <Button><Typography variant="button" color="white">{item}</Typography></Button></Link>
                            
                        </Button>
                        <Divider sx={{ color: "gray", bgcolor: "gray" }} />
                    </React.Fragment>
                ))
                )}
            </Stack>
        </Stack>
    )
}

export default Sidebar;
