import useSWR from "swr";
import useCommon from "./useCommon";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProduct = (category?: number) => {
  const baseUrl = '/api/products';
  const url = category ? `${baseUrl}?category=${category}` : baseUrl;
  
  const { data, error } = useSWR(url, fetcher);
  const { initFilter, filteredProducts } = useCommon();

  // Initialize filter when data is available
  if (data && (!filteredProducts || filteredProducts.length === 0)) {
    initFilter(data);
  }
  
  return {
    products: data,
    error,
    loading: !data && !error,
  };
};
