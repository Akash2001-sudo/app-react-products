import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useProducts(apiUrl) {
  const queryClient = useQueryClient()

  const fetchProducts = useCallback(async () => {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }, [apiUrl])

  const query = useQuery({
    queryKey: ['products', apiUrl],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const createProduct = useCallback(async (payload) => {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }, [apiUrl])

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  return {
    ...query,
    addProduct: mutation.mutate,
    addStatus: mutation
  }
}

export default useProducts
