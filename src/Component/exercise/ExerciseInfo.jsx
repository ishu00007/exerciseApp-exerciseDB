import React from "react";
import {Stack , Typography , List , ListItem , Box , Chip , Divider} from "@mui/material"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import "./exercise.css"
function ExerciseInfo(){

    const selectedExercise = JSON.parse(sessionStorage.getItem("selectedExercise"))
    return(
        <Stack direction={{xs:"column" , sm:"row" , md:"row" , lg :"row" , xl:"row"}} height={"100%"} maxWidth={"100vw"} mt={5} gap={4} mx={{xs:2}}>
            <Stack justifyContent={"center"} alignItems={"center"} my={"auto"} height={"100%"} className="exerciseImgContainer" borderRadius={"50px"}>
                <img src={selectedExercise.gif} width={400} className="exerciseImg"/> 
            </Stack>
            <Stack gap={4} height={"100%"} direction={"column"}>
                {/* <Typography variant="h3" fontFamily={"cursive"}>{selectedExercise.name}</Typography> */}
                <Box>
                    <Typography variant="h5" color={"gray"}>Instructions</Typography>
                <List>
                    {selectedExercise.instructions.map(item => <ListItem ><ArrowRightAltIcon/><Typography color={"white"} variant="h6"> {item}</Typography></ListItem>)}
                </List>
                </Box>
                
                <Stack direction={{xs:"column" , sm:"row" , md:"row" , lg:"row" , xl:"row"}} mx={{xs:"auto" , sm:0 , md:0 , lg:0 , xl:0}} gap={{xs:2 , sm:4 , md:4 , lg:4 , xl:4}} mb={3}>

                    <Box>
                        <Typography variant="h5" color={"gray"}>primary Muscles</Typography>
                        <Chip label = {selectedExercise.primaryMuscles} variant="filled" color="success" size="medium" sx={{fontSize:"1.2rem" , py:1 , px:2 , mt:2}}/>
                    </Box>
                    <Divider/>
                    <Box>
                    <Typography variant="h5" color={"gray"}>secondary Muscles</Typography>
                    {selectedExercise.secondaryMuscles.map(item => <Chip label = {item} variant="filled" color="secondary" sx={{fontSize:"1.2rem" , py:1 , px:1 , mr:1 , mt:2}}/>)}
                    </Box>

                    
                </Stack>
                
            </Stack>
        </Stack>
    )
}

export default ExerciseInfo;