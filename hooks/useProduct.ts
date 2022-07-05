import axios from "axios";
import useSWR from "swr";
import useCommon from "./useCommon";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useProduct = (url: string) => {
  const { data, error } = useSWR(url, fetcher);
  const { initFilter, filteredProducts } = useCommon();

  const loading = !data && !error;

  data && filteredProducts?.length === 0 && initFilter(data);
  return {
    products: data,
    error,
    loading,
  };
};
