import React, { useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import generateId from './IDGenerator';

const DatagridComponent = ({ data, pageSize, rowsPerPageoptions }) => {
  const rowsWithId = useMemo(() => {
    return data.map(row => ({
      ...row,
      id: row.id || generateId()
    }));
  }, [data]);

  const columns = useMemo(() => {
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
