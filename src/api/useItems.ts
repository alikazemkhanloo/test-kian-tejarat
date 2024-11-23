import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import { axios_client } from "./axiosClient";
import { per_page } from "@/constants";
import fakeData from "./fakeData.json";
import { Item } from "./types";


const fetchItems: QueryFunction<Item[], string[], number> = async ({
  pageParam,
}) => {
  return fakeData.slice(pageParam * per_page, (pageParam + 1) * per_page);
};
export const useInfinitItems = () =>
  useInfiniteQuery({
    queryKey: ["items-list"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length,
  });
