import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../CSS/ModalEdit.css'
import toast, { Toaster } from 'react-hot-toast';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const ModalEdit = ({ show, onClose, selectedRow, UrlEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [authorData, setAuthorData] = useState({
    authorID: selectedRow.AuthorID,
    birthDate: '',
    firstName: '',
    lastName: ''
  });
console.log(selectedRow);
  // Actualizar los datos del autor cuando se selecciona una nueva fila
  useEffect(() => {
    if (selectedRow) {
      setAuthorData({
        authorID: selectedRow.authorID,
        birthDate: selectedRow.birthDate,
        firstName: selectedRow.firstName,
        lastName: selectedRow.lastName
      });
      setHasChanges(false);
    }
  }, [selectedRow]);

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData((prev) => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsEditing(true);
    try {
      const response = await UrlEdit(authorData);
      if (response.status === 200) {
             console.log(response.data);
             toast.success('Autor editado correctamente!')
      } else {
        console.log("Couldn't apply the changes");
        toast.error('Hubo un error al actualizar el autor, intentalo de nuevo.')
      }
    } catch (error) {
      console.error("Couldn't connect to the database", error);
      toast.error('Hubo un error al actualizar el autor, intentalo de nuevo.')
    } finally {
      setIsEditing(false);
      onClose(); // Cerrar el modal después de guardar
    }
  };

  return (
    <>
    <div><Toaster/></div>
    <Modal 
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='title-edit'>
          Editar Autor
        </div>
        <Box component="form" noValidate autoComplete="off">
          <label className='birthdate'>
            Fecha de Nacimiento:
            <input
              type="date"
              name="birthDate"
              value={authorData.birthDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              name="firstName"
              value={authorData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="lastName"
              value={authorData.lastName}
              onChange={handleChange}
            />
          </label>

          <div className="button-container">
    <button className='save' onClick={handleSave} disabled={isEditing || !hasChanges}>
      {isEditing ? 'Guardando...' : 'Guardar'}
    </button>
    <button className='cancel' onClick={onClose} disabled={isEditing}>
      Cancelar
    </button>
  </div>  
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default ModalEdit;
