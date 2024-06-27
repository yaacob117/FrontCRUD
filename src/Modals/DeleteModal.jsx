import React, {useState, useCallback} from "react";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
 
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
 
function DeleteModal({show, onClose, authorID}) {
    console.log(show)
    //UseState para que el modal no aparezca cuando se cargue, por eso esta en false
    const[isDeleting, setIsDeleting] = useState(false)


    const handleDelete = async () => {
    setIsDeleting(true)
    try {
        const response = await DeleteAuthor({courseName: authorID})
        console.log(response);

        if (response === 200) {
            console.log("Deleted successfully");
        }
        else {
            console.log("Couldn't delete the desired registry");
        }
    } catch (error) {
        console.log("Couldn't connect to the DataBase");
    }
      finally{
        setTimeout(() => {
            onClose(true)
        }, 
        
        2000)

        setIsDeleting(false)
      }
    }
return(
    <>
        <Modal
        open = {show}
        onClose = {onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >

        <Box sx={style}>
        <h1 className="flex justify-center font-bold text-2xl mb-2 p-1 bg- rounded-md ">
          Eliminar Autor
        </h1>
        <Box component="form" noValidate autoComplete='off'>
            <div className="flex justify-center rounded-md font-semibold text-3xl bg-orange-200 p-4 mb-10">
                <p>
                    ¿Estas seguro que quieres eliminar este Autor?
                </p>

            </div>
            <div className=" flex justify-center space-x-12">
            <button className="p-3 rounded-lg font-medium bg-red-500 text-xl" onClick = {handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Eliminando' : 'Eliminar'}
            </button>

            <button className="p-3 rounded-lg font-medium bg-green-600 text-xl" onClick = {onClose} disabled = {isDeleting}>
                Cancelar
            </button>
            </div>
        </Box>

        </Box>

        </Modal>
        </>
)
}

export default DeleteModal