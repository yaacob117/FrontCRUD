import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyRouter from './Router/Router'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthorsComponent from './Components/AuthorsComp'
import DatagridComponent from './Utils/DatagridComponent.jsx'
import  Navbar  from "./Components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
            <Navbar/>
            <MyRouter/>
    </>
  );
