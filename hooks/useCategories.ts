import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCategories = (url: string) => {
  const { data, error } = useSWR(url, fetcher);

  const loading = !data && !error;
  const dishCount = data && data.map((item: any) => item.dishes.length);

  return {
    categories: data,
    error,
    loading,
    dishCount,
  };
};
