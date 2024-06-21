import React, {useState, useCallback} from "react";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function DeleteModal({show, onClose, selectedRow, UrlDelete, DeleteColumn}) {
    //UseState para que el modal no aparezca cuando se cargue, por eso esta en false
    const[isDeleting, setIsDeleting] = useState(false)

    const algo = selectedRow && selectedRow[DeleteColumn]

    const handleDelete = async () => {
    setIsDeleting(true)
    try {
        const response = await UrlDelete({courseName: algo})
        console.log(response);

        if (response === 200) {
            console.log("Deleted successfully");
        }
        else {
            console.log("Couldn't delete the desired registry");
        }
    } catch (error) {
        console.log("Could'nt connect to the DataBase");
    }
      finally{
        setTimeout(() => {
            onClose(true)
        }, 
        
        2000)

        setIsDeleting(false)
      }
    }
}