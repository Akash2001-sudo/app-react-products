// Lightweight API client for products
export async function fetchProductsApi(apiUrl, token) {
  const res = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createProductApi(apiUrl, payload, token) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateProductApi(apiUrl, payload, token) {
  const res = await fetch(`${apiUrl}/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteProductApi(apiUrl, id, token) {
  // delete via DELETE /api/products/:id
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteProductsApi(apiUrl, ids, token) {
  if (!Array.isArray(ids)) ids = [ids];
  const results = await Promise.all(
    ids.map((id) => deleteProductApi(apiUrl, id, token))
  );
  return results;
}

export default {
  fetchProductsApi,
  createProductApi,
  updateProductApi,
};
