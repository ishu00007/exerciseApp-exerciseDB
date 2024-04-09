import { Chip, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ExerciseCard(props) {
    const selectedExercise = {name : props.name , secondaryMuscles : props.secondaryMuscles , primaryMuscles : props.primaryMuscles , instructions : props.instructions , id : props.id ,gif:props.gif}

    const handleClick = () => {
        sessionStorage.setItem("selectedExercise" , JSON.stringify(selectedExercise))
        // console.log(JSON.parse(sessionStorage.getItem("selectedExercise")));
    }
    return (
        <Link style={{textDecoration:"none"}} onClick={() => handleClick()} to={`/${props.id}`}>
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ bgcolor: "white", borderRadius: 6, textAlign: 'center', py: 1, px: 2 }} gap={2} >
                <img src={props.gif} width={'150px'} alt={props.name} />
                <Typography variant="h5" color={"black"} sx={{ textDecoration: "none" }}>{props.name}</Typography>
                <Stack direction="row" spacing={1} justifyContent={"center"} flexWrap={"wrap"}>
                    <Chip label={props.primaryMuscles} color="success" />
                    {props.secondaryMuscles && props.secondaryMuscles.map((item, index) => (
                        <Chip key={index} label={item} />
                    ))}
                </Stack>
            </Stack>
        </Link>

    );
}

export default ExerciseCard;
