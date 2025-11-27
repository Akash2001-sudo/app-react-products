import * as React from 'react'
import { useMemo, useState } from 'react'
import useProducts from './hooks/useProducts'
import ProductTable from './components/ProductTable'
import AddProductDialog from './components/AddProductDialog'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Snackbar
  , Backdrop
} from '@mui/material'

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
  { field: 'description', headerName: 'Description', flex: 2, minWidth: 300 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    flex: 0.6,
    minWidth: 120,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ fontWeight: 700, color: 'primary.main' }}>${Number(params.value).toFixed(2)}</Box>
      </Box>
    )
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

  const { data, isLoading, isError, error, addProduct, addStatus } = useProducts(apiUrl)
  const rows = useMemo(() => normalizeItems(data ?? []), [data])
  const [filterText, setFilterText] = useState('')
  const displayRows = useMemo(() => {
    if (!filterText) return rows
    const q = filterText.toLowerCase()
    return rows.filter(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || String(r.price).toLowerCase().includes(q))
  }, [rows, filterText])

  // dialog + form state for adding a new product
  const [open, setOpen] = useState(false)
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
  const [isAdding, setIsAdding] = useState(false)

  // addStatus is the mutation object coming from the hook
  const adding = isAdding || addStatus.isLoading

  return (
    <>
      <AppBar position="static" elevation={3} sx={{ background: 'linear-gradient(90deg,#2563eb 0%, #1e40af 100%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => setOpen(true)} sx={{ mr: 2 }} startIcon={adding ? <CircularProgress size={16} color="inherit" /> : null}>
            Add Product
          </Button>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Catalog
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }} className="card-shadow">
          {isError && (
            <Box mb={2}>
              <Alert severity="error">Failed to load products: {error?.message ?? String(error)}</Alert>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {rows.length} Products
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Showing {displayRows.length} items
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField size="small" placeholder="Search products..." value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            </Box>
          </Box>

          <Box sx={{ height: 520, width: '100%', mt: isError ? 2 : 0 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProductTable rows={displayRows} columns={columns} loading={isLoading} error={isError ? error : null} />
            )}
          </Box>
        </Paper>
      </Container>

      {/* Full-screen loading backdrop while adding */}
      <Backdrop open={adding} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Add Product Dialog */}
      <AddProductDialog
        open={open}
        onClose={() => setOpen(false)}
        adding={adding}
        addError={addStatus.error}
        onAdd={(payload, options) => {
          setIsAdding(true)
          addProduct(payload, {
            ...(options || {}),
            onSuccess: (data) => {
              setIsAdding(false)
              setSnack({ open: true, message: 'Product added', severity: 'success' })
              if (options?.onSuccess) options.onSuccess(data)
            },
            onError: (err) => {
              setIsAdding(false)
              if (options?.onError) options.onError(err)
            }
          })
        }}
      />
        
        
      
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}
