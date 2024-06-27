import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Estilos del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

const ModalAdd = ({ show, onClose, AddAuthor }) => {
  const [isAdding, setIsAdding] = useState(false); // Estado para manejar si estamos en proceso de agregar
  const [authorData, setAuthorData] = useState({
    birthDate: "",
    firstName: "", // Se cambia a 'firstName' para que coincida con el nombre en el input
    lastName: "", // Se cambia a 'lastName' para que coincida con el nombre en el input
  });

  // Manejar los cambios en los inputs
  const handleAdd = (e) => {
    const { name, value } = e.target;
    setAuthorData((prev) => ({
      ...prev, // Copiar las propiedades actuales del estado
      [name]: value, // Actualizar solo la propiedad específica con el nuevo valor
    }));
  };

  // Manejar la acción de guardar
  const handleSave = async () => {
    setIsAdding(true); // Indicar que estamos en proceso de agregar
    try {
      console.log("Estos son los datos", authorData); // Mostrar los datos del autor antes de enviarlos
      const response = await AddAuthor(authorData); // Enviar los datos al backend para agregar

      if (response.status === 200) {
        console.log(response.data); // Confirmar que la adición fue exitosa
      } else {
        console.log("Couldn't add the author, try again"); // Indicar que la adición falló
      }
    } catch (error) {
      console.error("Couldn't connect to the database,", error); // Manejar errores de conexión
    } finally {
      setIsAdding(false); // Indicar que la adición ha terminado
      onClose(); // Cerrar el modal después de guardar
    }
  };

  return (
    <Modal
      open={show} // Controlar la visibilidad del modal
      onClose={onClose} // Función para cerrar el modal
      aria-labelledby="modal-modal-title" // Atributo de accesibilidad
      aria-describedby="modal-modal-description" // Atributo de accesibilidad
    >
      <Box sx={style}>
        <Box component="form" noValidate autoComplete="off">
          <h1 className=" text-center mb-7 text-3xl text-blue-500 font-bold bg-purple-200">
            AGREGAR AUTOR
          </h1>
          <label className=" mr-8 flex justify-center mb-5">
            Fecha de Nacimiento:
            <input
              type="date"
              name="birthDate" // Nombre del campo que se está actualizando
              value={authorData.birthDate} // Valor actual del estado
              onChange={handleAdd} // Manejador de cambios
            />
          </label>
          <label className="mr-8 flex justify-center mb-5">
            Nombre
            <input
              className="border-inherit border-2 border-indigo-600"
              type="text"
              name="firstName" // Nombre del campo que se está actualizando
              value={authorData.firstName} // Valor actual del estado
              // onChange={handleAdd} // Manejador de cambios
            />
          </label>
          <label className="mr-8 flex justify-center mb-8">
            Apellido:
            <input
              className="border-inherit border-2 border-indigo-600"
              type="text"
              name="lastName" // Nombre del campo que se está actualizando
              value={authorData.lastName} // Valor actual del estado
              onChange={handleAdd} // Manejador de cambios
            />
          </label>
          <div className=" space-x-12 flex justify-center">
          <button className="button px-5 py-2.5 bg-blue-400 rounded-lg hover:bg-blue-500 text-white" onClick={handleSave} disabled={isAdding}>
            {isAdding ? "Guardando..." : "Guardar"}
          </button>
          <button className="button px-5 py-2.5 bg-red-400 rounded-lg hover:bg-red-500 text-white" onClick={onClose} disabled={isAdding}>
            Cancelar
          </button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
