import React, { useState, useEffect } from 'react';
import { GetAllAuthors, DeleteAuthor } from '../API/EndPoints';
import '../CSS/AuthorsComp.css'; // Importa tus estilos CSS
import DatagridComponent  from '../Utils/DatagridComponent'
const AuthorsComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await GetAllAuthors();
        setData(response);
        console.log('Data from API:', response); // Verifica los datos obtenidos en la consola
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
    fetchAuthors();
  }, []); // useEffect se utiliza correctamente con un array vacío como segundo argumento

  // Verifica si data es un array antes de usar map
  if (!Array.isArray(data)) {
    return <p>Loading...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  
  return (
    <>
    <h1 className='Header'>CRUD LIBRARY<span>Ejemplo</span></h1>
      <div>
       <DatagridComponent
       data ={data}
       pageSize = {5}
      rowsPerPageoptions ={29}
      urldelete ={DeleteAuthor}
       />
      </div>
    </>
  );
};

export default AuthorsComponent;
