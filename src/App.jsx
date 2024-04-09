import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./App.css"
// import Navbar from "./Component/Navbar/Navbar"
import Sidebar from "./Component/Sidebar/Sidebar"
import Layout from "./Component/Layout/Layout"
import ExerciseContextProvider from "./store/context.jsx"
import ExercisesContainer from "./Component/exercise/ExercisesContainer.jsx"
import ExerciseInfo from "./Component/exercise/ExerciseInfo.jsx"
function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout/>}>
        <Route element={<ExercisesContainer/>} path="/"/>
        <Route element={<ExercisesContainer/>} path="/:category/:subCategory"/>
        <Route element={<ExerciseInfo/>} path="/:id"/>
    </Route>

  ))

  return (

    <ExerciseContextProvider>
      <RouterProvider router={router} />
    </ExerciseContextProvider>

    

  )
}

export default App
