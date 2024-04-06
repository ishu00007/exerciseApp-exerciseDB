import React, { useContext, useEffect, useRef, useState } from "react";
import { Autocomplete, Stack, Typography, TextField, MenuItem, Menu, Button, CircularProgress, Divider } from "@mui/material";
import axios from "../../Axios/axios"
import { exerciseContext } from "../../store/context";
function Sidebar() {

    const input = useRef()

    const {fetchData , exercises , setExercises , setCurrentPage} = useContext(exerciseContext)

    // useEffect(() => {
    //     console.log(input.current.value);
    // } , [input])


    const [selectedCategory , setSelectedCategory] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = async (value) => {
        sessionStorage.setItem("category", value)
        const category = localStorage.getItem("category")
        handleClose()

        fetchData(`${category}List` , setSelectedCategory)
        setCurrentPage(1)
    }

    const handleExerciseOptionClick = async (value) => {
        localStorage.setItem("subCategory" , value)
        const subCategory = localStorage.getItem("subCategory")
        const category = localStorage.getItem("category")
        console.log(`${category}/${subCategory}`);
        fetchData(`${category}/${subCategory}` , setExercises)
        setCurrentPage(1)
        
    }

    return (
        <Stack maxWidth={200} bgcolor={"black"} width={200} height={`calc(100vh - 68.5px)`} sx={{overflowX:"hidden" , overflowY:"scroll" , }}  display={{xs:"none", lg:"flex"}}>

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
                {localStorage.getItem("category") ? localStorage.getItem("category") : <Typography>All Exercises</Typography> }
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

            >

                {["equipment", "bodyPart", "target"].map(item => <MenuItem onClick={() => handleSelect(item)}>{item}</MenuItem>)}
                
            </Menu>

            <Stack>
                {selectedCategory.length === 0 ? <Typography color={"white"}>All Exercises</Typography> : selectedCategory.map(item => <><Button variant="text" onClick={()=> handleExerciseOptionClick(item)}><Typography variant="button" color={"white"} >{item}</Typography></Button>
                <Divider sx={{color:"gray" , bgcolor:"gray"}}/></> )}
            </Stack>


        </Stack>
    )
}

export default Sidebar