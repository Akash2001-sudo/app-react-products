import * as React from 'react'
import { useMemo, useState, useContext } from 'react'
import useProducts from '../hooks/useProducts'
import ProductTable from '../components/ProductTable'
import ProductDialog from '../components/ProductDialog'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Snackbar
  , Backdrop
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Tooltip, Badge } from '@mui/material'
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FallingStars from '../components/FallingStars';
import LogoutIcon from '@mui/icons-material/Logout';

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

const AnimatedTitle = () => {
  const text = "Products";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      component="div"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotate: 360,
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
              delay: index * 0.1,
            },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};


export default function DashboardPage() {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  // Read API URL from Vite env var VITE_PRODUCTS_API; fallback to /api/products
  const apiUrl = import.meta.env.VITE_PRODUCTS_API ?? "https://core-products.onrender.com/api/products";

  const { data, isLoading, isError, error, addProduct, addStatus, updateProduct, updateStatus, deleteProducts, deleteStatus } = useProducts(apiUrl)
  const rows = useMemo(() => normalizeItems(data ?? []), [data])
  const [filterText, setFilterText] = useState('')
  const displayRows = useMemo(() => {
    if (!filterText) return rows
    const q = filterText.toLowerCase()
    return rows.filter(r => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || String(r.price).toLowerCase().includes(q))
  }, [rows, filterText])

  const [open, setOpen] = useState(false)
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
  const [isAdding, setIsAdding] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const adding = isAdding || addStatus.isLoading || isSaving || updateStatus.isLoading

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
          <Box sx={{ fontWeight: 700, color: 'primary.main' }}>₹{Number(params.value).toFixed(2)}</Box>
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <Tooltip title="Edit product">
          <IconButton
            color="primary"
            onClick={() => {
              setEditingProduct(params.row)
              setOpen(true)
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  return (
    <>
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(90deg, #654ea3 0%, #eaafc8 100%)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <FallingStars />        <Toolbar sx={{ p: '0.5rem 1.5rem' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <AnimatedTitle />
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Tooltip title="Logout">
            <IconButton onClick={logout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Catalog
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
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
              <Tooltip title="Add product">
                <IconButton color="primary" onClick={() => { setEditingProduct(null); setOpen(true) }} disabled={adding}>
                  {adding ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={selectedIds.length === 0 ? 'Select rows to delete' : `Delete (${selectedIds.length})`}>
                <span>
                  <IconButton color="error" onClick={() => setConfirmOpen(true)} disabled={selectedIds.length === 0 || deleteStatus.isLoading || isDeleting}>
                    <Badge badgeContent={selectedIds.length} color="error">
                      <DeleteIcon />
                    </Badge>
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ height: 520, width: '100%', mt: isError ? 2 : 0 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProductTable
                rows={displayRows}
                columns={columns}
                loading={isLoading}
                error={isError ? error : null}
                rowSelectionModel={selectedIds}
                onRowSelectionModelChange={(newSelection) => {
                  if (Array.isArray(newSelection)) setSelectedIds(newSelection)
                  else if (newSelection instanceof Set) setSelectedIds(Array.from(newSelection))
                  else setSelectedIds([newSelection])
                }}
              />
            )}
          </Box>
        </Paper>
      </Container>

      <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: 'background.paper', borderTop: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <a color="inherit" href="https://mui.com/">
              Your Website
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>

      <Backdrop open={adding} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ProductDialog
        open={open}
        onClose={() => setOpen(false)}
        adding={adding}
        addError={addStatus.error || updateStatus.error}
        product={editingProduct}
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
        onSave={(payload, options) => {
          setIsSaving(true)
          updateProduct(payload, {
            ...(options || {}),
            onSuccess: (data) => {
              setIsSaving(false)
              setSnack({ open: true, message: 'Product saved', severity: 'success' })
              if (options?.onSuccess) options.onSuccess(data)
            },
            onError: (err) => {
              setIsSaving(false)
              if (options?.onError) options.onError(err)
            }
          })
        }}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedIds.length} selected item(s)?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={isDeleting || deleteStatus.isLoading}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setIsDeleting(true)
              deleteProducts(selectedIds, {
                onSuccess: () => {
                  setIsDeleting(false)
                  setConfirmOpen(false)
                  setSelectedIds([])
                  setSnack({ open: true, message: 'Deleted', severity: 'success' })
                },
                onError: (err) => {
                  setIsDeleting(false)
                  setSnack({ open: true, message: String(err), severity: 'error' })
                }
              })
            }}
            disabled={isDeleting || deleteStatus.isLoading}
          >
            {isDeleting || deleteStatus.isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      
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
