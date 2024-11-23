import {
  QueryFunction,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { axios_client } from "./axiosClient";
import { perPage } from "@/constants";
import fakeData from "./fakeData.json";
import { Item } from "./types";

export const fetchItem: (id: number) => Item | undefined = (id) => {
  const item = fakeData.find((i) => i.id === id);
  if (item) {
    return item;
  } else {
    throw new Error("404");
  }
};

export const useGetItem = (id: number) =>
  useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
  });
