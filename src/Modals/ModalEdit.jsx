import React, { useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

export default function ModalEdit({show, onClose, selectedRow, UrlDelete, DeleteColumn}) {
    const[isEditing, setisEditing] = useState(false)

    const datos = selectedRow && selectedRow[EditColumn]

    const handleEdit = async () => {
        setisEditing(true)
        try {
            const response = await 
        } catch (error) {
            throw error
        }
    }
}