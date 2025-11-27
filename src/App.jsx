import * as React from 'react'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataGrid } from '@mui/x-data-grid'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material'

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
  // Read API URL from Vite env var VITE_PRODUCTS_API; fallback to /api/products
  const apiUrl = import.meta.env.VITE_PRODUCTS_API || '/api/products'

  async function fetchProducts() {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', apiUrl],
    queryFn: fetchProducts,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1
  })

  const rows = useMemo(() => normalizeItems(data ?? []), [data])

  return (
    <>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Catalog
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
          {isError && (
            <Box mb={2}>
              <Alert severity="error">Failed to load products: {error?.message ?? String(error)}</Alert>
            </Box>
          )}

          <Box sx={{ height: 520, width: '100%', mt: isError ? 2 : 0 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(37,99,235,0.06)' },
                  '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(37,99,235,0.06)' }
                }}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </>
  )
}
