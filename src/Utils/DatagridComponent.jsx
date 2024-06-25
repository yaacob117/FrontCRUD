import React, { useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import generateId from './IDGenerator';
import {DeleteAuthor, UpdateAuthor} from "../API/EndPoints"
const DatagridComponent = ({ data, pageSize, rowsPerPageoptions}) => {
  const rowsWithId = useMemo(() => {
    return data.map(row => ({
      ...row,
      id: row.id || generateId()
    }));
  }, [data]);

const handleDelete =  (authorID)  => async () => {
  const response = await DeleteAuthor(authorID);
  if (response.status !== 200) {
    console.log("OCURRIO UN ERRRO");
  }
  console.log("TODO BIEN");

};

const handleEdit = (row) => () => {
  const {birthDate, firstName, lastName} = row;
  const objet = {
    birthDate,
    firstName,
    lastName
  }
 console.log(objet);

};

// Columns
  const dataColumns = useMemo(() => {
    if (rowsWithId.length > 0) {
      const keys = Object.keys(rowsWithId[0]);
      return keys
        .filter((key) => key !== 'id')
        .map((key) => ({
          field: key,
          headerAlign: 'center',
          align: 'center',
          headerName: key.toUpperCase(),
          flex: 1,
          renderCell: (params) => (
            <div style={{ whiteSpace: "normal", wordWrap: "break-word", lineHeight: "1.2" }}>
              {params.value}
            </div>
          )
        }));
    }
    return [];
  }, [rowsWithId]);

  const actionColumn = {
    field: 'actions',
    headerName: 'ACCIONES',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleEdit(params.row)}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleDelete(params.row.authorID)}
        >
          Eliminar
        </Button>
      </div>
    ),
  };

  const columns = useMemo(() => [...dataColumns, actionColumn], [dataColumns]);

  return (
    <div className="sticky-container mb-12">
      <DataGrid
        className="custom-data-grid mx-4"
        rows={rowsWithId}
        columns={columns}
        pageSize={pageSize}
        getRowHeight={() => "auto"}
        rowsPerPageOptions={rowsPerPageoptions}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          }
        }}
      />
    </div>
  );
};

export default DatagridComponent;
