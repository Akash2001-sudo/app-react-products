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

export default {
  fetchProductsApi,
  createProductApi
}
