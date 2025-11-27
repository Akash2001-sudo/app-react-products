import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button, Alert } from '@mui/material'

export default function AddProductDialog({ open, onClose, onAdd, adding, addError }) {
  const [form, setForm] = useState({ name: '', description: '', price: '' })

  const reset = () => setForm({ name: '', description: '', price: '' })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'grid', gap: 2, width: 420, mt: 1 }}>
          <TextField disabled={adding} label="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
          <TextField disabled={adding} label="Description" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} fullWidth />
          <TextField disabled={adding} label="Price" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} fullWidth />
          {addError && <Alert severity="error">{String(addError)}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); reset() }} disabled={adding}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            const priceNum = Number(form.price ?? 0)
            const payload = { name: form.name, description: form.description, price: Number.isNaN(priceNum) ? 0 : priceNum }
            onAdd(payload, { onSuccess: () => { onClose(); reset() } })
          }}
          disabled={adding || !form.name || (form.price !== '' && Number.isNaN(Number(form.price)))}
        >
          {adding ? 'Adding…' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
