import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button, Alert } from '@mui/material'

export default function ProductDialog({ open, onClose, onSave, onAdd, adding, addError, product }) {
  const [form, setForm] = useState({ name: '', description: '', price: '' })
  const isEdit = Boolean(product)

  useEffect(() => {
    if (product) {
      setForm(product)
    } else {
      reset()
    }
  }, [product])

  const reset = () => setForm({ name: '', description: '', price: '' })

  const handleSave = () => {
    const priceNum = Number(form.price ?? 0)
    const payload = { ...form, price: Number.isNaN(priceNum) ? 0 : priceNum }
    if (isEdit) {
      onSave(payload, { onSuccess: () => { onClose(); reset() } })
    } else {
      onAdd(payload, { onSuccess: () => { onClose(); reset() } })
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
          onClick={handleSave}
          disabled={adding || !form.name || (form.price !== '' && Number.isNaN(Number(form.price)))}
        >
          {adding ? (isEdit ? 'Saving…' : 'Adding…') : (isEdit ? 'Save' : 'Add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
