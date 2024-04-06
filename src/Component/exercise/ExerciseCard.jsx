import { Chip, Stack, Typography, Box } from "@mui/material";
import React from "react";

function ExerciseCard(props) {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{bgcolor:"white" , borderRadius:6 , textAlign:'center' , pb:2 , px:2}} gap={2} >
            <img src={props.gif} width={'150px'} alt={props.name} />
            <Typography variant="h5">{props.name}</Typography>
            <Stack direction="row" spacing={1} justifyContent={"center"} flexWrap={"wrap"}>
                <Chip label={props.primaryMuscles} color="success"/>
                {props.secondaryMuscles && props.secondaryMuscles.map((item, index) => (
                    <Chip key={index} label={item} />
                ))}
            </Stack>
        </Stack>
    );
}

export default ExerciseCard;
