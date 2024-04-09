import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, Pagination, Stack, Box, Typography } from "@mui/material";
import { exerciseContext } from "../../store/context";
import ExerciseCard from "./ExerciseCard";
import { useParams, useLocation } from "react-router-dom";


function ExercisesContainer() {
    const { exercises, fetchData, setExercises, currentPage, setCurrentPage, loading } = useContext(exerciseContext);
    const { category, subCategory } = useParams()
    const location = useLocation()
    const [itemsPerPage] = useState(6); // Number of items per page

    useEffect(() => {
        if (location === "/:category/:subCategory") {
            fetchData(`/${category}/${subCategory}`, setExercises)
        }
        else if (location === "/") {
            fetchData('', setExercises);
        }

    }, []);

    // Logic to calculate the indexes of items to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (event, newPage) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(newPage);

    };


    return (
        <Grid container spacing={2} bgcolor={"black"} px={3} overflow={"scroll"} height={`calc(100vh - 68.5px)`} sx={{ overflowX: "hidden" }} pt={{xs:3}}>
            {loading ?
                <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <CircularProgress color="warning" />
                </Stack>

                :


                exercises.length !== 0 ?
                    <>
                        {currentItems.map(item => (
                            <Grid key={item.id} item xs={12} sm={6} md={4} lg={4} maxHeight={'260'}>
                                <ExerciseCard
                                    name={item.name}
                                    gif={item.gifUrl}
                                    primaryMuscles={item.target}
                                    secondaryMuscles={item.secondaryMuscles}
                                    id={item.id}
                                    instructions={item.instructions}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                            <Pagination

                                count={Math.ceil(exercises.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                color="primary"


                                sx={{
                                    backgroundColor: 'white',
                                    color: 'white',
                                    p: 2,
                                    borderRadius: 10,
                                    mb: 4,
                                    maxHeight: "50px",
                                    
                                }}
                            />
                        </Grid>
                    </>

                    :

                    <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="h4" color={"white"}>There are no such exercises!!</Typography>
                    </Stack>

            }
            {/* Pagination */}






        </Grid>


    );
}


export default ExercisesContainer;
