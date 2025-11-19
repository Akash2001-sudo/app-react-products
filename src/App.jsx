import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const rows = [
  { id: 1, name: 'Product A', description: 'Entry-level product', price: 9.99 },
  { id: 2, name: 'Product B', description: 'Best seller', price: 19.99 },
  { id: 3, name: 'Product C', description: 'Premium option', price: 29.99 }
]

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'description', headerName: 'Description', flex: 2, minWidth: 200 },
  {
    field: 'price',
    headerName: 'price',
    type: 'number',
    flex: 0.7,
    minWidth: 120,
    valueFormatter: (params) => `$${Number(params.value).toFixed(2)}`
  }
]

export default function App() {
  return (
    <div className="app" style={{ height: 420, width: '100%' }}>
      <header>
        <h1>Products</h1>
      </header>

      <div style={{ height: 340, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  )
}
