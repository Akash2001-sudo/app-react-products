import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductsApi
} from '../api/products'

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

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  const updateProduct = useCallback(async (payload) => updateProductApi(apiUrl, payload), [apiUrl])

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  const deleteMutation = useMutation({
    mutationFn: (ids) => deleteProductsApi(apiUrl, ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', apiUrl] })
  })

  return {
    ...query,
    addProduct: createMutation.mutate,
    addStatus: createMutation,
    updateProduct: updateMutation.mutate,
    updateStatus: updateMutation,
    deleteProducts: deleteMutation.mutate,
    deleteStatus: deleteMutation
  }
}

export default useProducts
