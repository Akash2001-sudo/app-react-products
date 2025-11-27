// Lightweight API client for products
export async function fetchProductsApi(apiUrl) {
  const res = await fetch(apiUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function createProductApi(apiUrl, payload) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deleteProductApi(apiUrl, id) {
  // delete via DELETE /api/products/:id
  const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deleteProductsApi(apiUrl, ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const results = await Promise.all(ids.map(id => deleteProductApi(apiUrl, id)))
  return results
}

export default {
  fetchProductsApi,
  createProductApi
}
