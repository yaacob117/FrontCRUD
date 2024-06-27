import React, { useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import generateId from './IDGenerator';
import { DeleteAuthor, UpdateAuthor } from "../API/EndPoints";
import ModalEdit from '../Modals/ModalEdit'; // Importar el componente del modal
import ModalAdd from '../Modals/ModalAdd';
import { AddAuthor } from '../API/EndPoints';
import '../CSS/ModalAdd.css'
import DeleteModal from '../Modals/DeleteModal';

const DatagridComponent = ({ data, pageSize, rowsPerPageoptions }) => {
  const rowsWithId = useMemo(() => {
    return data.map(row => ({
      ...row,
      id: row.id || generateId()
    }));
  }, [data]);

  // Estado para controlar la visibilidad del modal y la fila seleccionada para editar
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const[DeleteModalOpen, setDeleteModalOpen] = useState(false)

  const [selectedRow, setSelectedRow] = useState(null);
  const [authorID, setSauthorID] = useState(null);


  const handleDelete = async (row) => {
    console.log(row);
     setSauthorID(row)
      setDeleteModalOpen(true)
    }



  const handleEdit = (row) => () => {
    // Establecer la fila seleccionada y abrir el modal
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  }


  // Columns
  const dataColumns = useMemo(() => {
    if (rowsWithId.length > 0) {
      const keys = Object.keys(rowsWithId[0]);
            let cols = keys

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

  const EdtiColumn = {
    field: 'actions',
    headerName: '',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button className = 'buttonEdit'
           onClick={handleEdit(params.row)} // Manejar el evento de editar
          >
          Editar
        </button>
        
      </div>
    ),
  };


  const DeleteColumn = {
    field: 'actasdasions',
    headerName: '',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button className='buttonDelete'
          onClick={() => {
            handleDelete(params.row)
          }}

        >
          Eliminar
        </button>
      </div>
    ),
  };

  

  const columns = useMemo(() => [...dataColumns, EdtiColumn, DeleteColumn], [dataColumns]);

  return (
    <div className="sticky-container mb-12">
       <button  className = 'buttonAdd' onClick={handleAdd} >
        Agregar Autor
      </button>
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
            <ModalAdd 
            show={AddModalOpen} 
            onClose={() => setAddModalOpen(false)}
            AddAuthor={AddAuthor}
             />
              <DeleteModal
              show={DeleteModalOpen} 
              authorID ={authorID}
              onClose={() => setDeleteModalOpen(false)}
              />
      {/* Incluir el modal para editar */}
      {selectedRow && (
        <ModalEdit
          show={EditModalOpen}
          onClose={() => setEditModalOpen(false)}
          selectedRow={selectedRow}
          UrlEdit={UpdateAuthor}
        />
      )}
    </div>
  );
};

export default DatagridComponent;
