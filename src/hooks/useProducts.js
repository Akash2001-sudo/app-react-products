import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchProductsApi, createProductApi, deleteProductsApi } from '../api/products'

export function useProducts(apiUrl) {
  const queryClient = useQueryClient()

  const fetchProducts = useCallback(async () => fetchProductsApi(apiUrl), [apiUrl])

  const query = useQuery({
    queryKey: ['products', apiUrl],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const createProduct = useCallback(async (payload) => createProductApi(apiUrl, payload), [apiUrl])

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  const deleteMutation = useMutation({
    mutationFn: (ids) => deleteProductsApi(apiUrl, ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  return {
    ...query,
    addProduct: mutation.mutate,
    addStatus: mutation,
    deleteProducts: deleteMutation.mutate,
    deleteStatus: deleteMutation
  }
}

export default useProducts
