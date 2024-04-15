import { createContext, useState } from "react";
import axios from "../Axios/axios"

export const exerciseContext = createContext({fetchData: "" , exercises: "" , setExercises :"" , currentPage : "" , setCurrentPage:"" , loading : "" , setLoading : ""})

const ExerciseContextProvider = ({ children }) => {

    const [exercises, setExercises] = useState([])
    const [loading , setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    const options = {

        headers: {
            'X-RapidAPI-Key': '1eb02ef333mshfe079367319479fp1a6fe8jsnf44fdc248bf3',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        } ,
        params :{
            limit : "1000"
        }
    };

    const fetchData = async (endpoint , setState) => {
        try {
            setLoading(true)
            const response = await axios.get(endpoint,options)
            if(response.status === 200){
                console.log(response.data);
                await setState(response.data)
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    const value={fetchData , exercises , setExercises , currentPage , setCurrentPage , loading}

    return (
        <exerciseContext.Provider value={value}>
            {children}
        </exerciseContext.Provider>
    )
}

export default ExerciseContextProvider