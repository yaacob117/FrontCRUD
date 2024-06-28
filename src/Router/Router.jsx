import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Authors from '../Pages/Authors'
import AuthorsComponent from '../Components/AuthorsComp'
import NewComp from '../Components/NewComp'
const MyRouter = () => {

    return(
     <BrowserRouter>
        <Routes>
            
            <Route path = "/" element={<Authors/>} />  
            <Route path = "/NewRoute" element={<NewComp/>} />
        </Routes>
        </BrowserRouter>   
    )
}

export default MyRouter