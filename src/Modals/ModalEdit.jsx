import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../CSS/ModalEdit.css'

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
};

const ModalEdit = ({ show, onClose, selectedRow, UrlEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
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
    }
  }, [selectedRow]);

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsEditing(true);
    try {
      const response = await UrlEdit(authorData);
      if (response.status === 200) {
             console.log(response.data);
      } else {
        console.log("Couldn't apply the changes");
      }
    } catch (error) {
      console.error("Couldn't connect to the database", error);
    } finally {
      setIsEditing(false);
      onClose(); // Cerrar el modal después de guardar
    }
  };

  return (
    <Modal 
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar Autor
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <label>
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

          <Button onClick={handleSave} disabled={isEditing}>
            {isEditing ? 'Guardando...' : 'Guardar'}
          </Button>

          <Button onClick={onClose} disabled={isEditing}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
