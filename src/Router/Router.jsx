import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Authors from '../Pages/Authors'

const MyRouter = () => {

    return(
     <BrowserRouter>
        <Routes>
            
            <Route path = "/Authors" element={<Authors/>} />  
        </Routes>
        </BrowserRouter>   
    )
}

export default MyRouter