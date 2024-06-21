import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyRouter from './Router/Router'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthorsComponent from './Components/AuthorsComp'
import DatagridComponent from './Utils/DatagridComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/authors" element={<AuthorsComponent />} />
        <Route path="DataGridAuthors" element={<DatagridComponent/>} />
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </Router>
  );
