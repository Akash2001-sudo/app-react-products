import * as React from 'react'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, CircularProgress, Alert } from '@mui/material'

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

function normalizeItems(data) {
  // Map a generic API response into the DataGrid row shape we expect
  if (!Array.isArray(data)) return []
  return data.map((item, idx) => ({
    id: item.id ?? item._id ?? idx + 1,
    name: item.name ?? item.title ?? '',
    description: item.description ?? item.desc ?? '',
    price: Number(item.price ?? item.cost ?? 0)
  }))
}

export default function App() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Read API URL from Vite env var VITE_PRODUCTS_API; fallback to /api/products
  const apiUrl = import.meta.env.VITE_PRODUCTS_API || '/api/products'

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!mounted) return
        setRows(normalizeItems(data))
      } catch (err) {
        if (!mounted) return
        setError(String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    // Only attempt fetch if an API URL is configured (fallback still tries /api/products)
    fetchProducts()
    return () => {
      mounted = false
    }
  }, [apiUrl])

  return (
    <div className="app" style={{ width: '100%' }}>
      <header>
        <h1>Products</h1>
      </header>

      {error && (
        <Box mb={2}>
          <Alert severity="error">Failed to load products: {error}</Alert>
        </Box>
      )}

      <Box sx={{ height: 420, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
        )}
      </Box>
    </div>
  )
}
