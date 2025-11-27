import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, CircularProgress, Typography } from '@mui/material'

export default function ProductTable({ rows, loading, error, columns, pageSize = 5 }) {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(37,99,235,0.06)' },
            '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(37,99,235,0.06)' }
          }}
        />
      )}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {String(error)}
        </Typography>
      )}
    </Box>
  )
}
