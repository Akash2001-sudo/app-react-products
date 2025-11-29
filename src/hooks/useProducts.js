import { useCallback, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductsApi,
} from "../api/products";
import { AuthContext } from "../context/AuthContext";

export function useProducts(apiUrl) {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const fetchProducts = useCallback(
    async () => fetchProductsApi(apiUrl, token),
    [apiUrl, token]
  );

  const query = useQuery({
    queryKey: ["products", apiUrl, token],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!token, // only fetch if token is present
  });

  const createProduct = useCallback(
    async (payload) => createProductApi(apiUrl, payload, token),
    [apiUrl, token]
  );

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", apiUrl, token] }),
  });

  const updateProduct = useCallback(
    async (payload) => updateProductApi(apiUrl, payload, token),
    [apiUrl, token]
  );

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", apiUrl, token] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids) => deleteProductsApi(apiUrl, ids, token),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products", apiUrl, token] }),
  });

  return {
    ...query,
    addProduct: createMutation.mutate,
    addStatus: createMutation,
    updateProduct: updateMutation.mutate,
    updateStatus: updateMutation,
    deleteProducts: deleteMutation.mutate,
    deleteStatus: deleteMutation,
  };
}

export default useProducts;
