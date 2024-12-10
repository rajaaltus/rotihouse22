import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCategories = (url: string) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    categories: data,
    error,
    loading: !data && !error,
  };
};
