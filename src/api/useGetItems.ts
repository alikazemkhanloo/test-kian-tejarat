import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import { axios_client } from "./axiosClient";
import { perPage } from "@/constants";
import fakeData from "./fakeData.json";
import { Item } from "./types";


const fetchItems: QueryFunction<Item[], string[], number> = async ({
  pageParam,
}) => {
  return fakeData.slice(pageParam * perPage, (pageParam + 1) * perPage);
};


export const useGetInfinitItems = () =>
  useInfiniteQuery({
    queryKey: ["items-list"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length,
  });
