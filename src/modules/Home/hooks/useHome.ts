import { Item } from "@/api/types";
import { useGetInfinitItems } from "@/api/useGetItems";
import { useEffect, useMemo, useRef, useState } from "react";

type GroupedData = { date: string; data: Item[] };

export const useHome = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfinitItems();

  const loadingRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const groupedData = useMemo(() => {
    const result: GroupedData[] = [];
    data?.pages.map((page) =>
      page.map((item) => {
        const currentGroupIndex = result.findIndex(
          (i) => i.date === item.creationAt
        );
        if (currentGroupIndex >= 0) {
          result[currentGroupIndex].data.push(item);
        } else {
          result.push({ date: item.creationAt, data: [item] });
        }
      })
    );
    return result;
  }, [data]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        const isIntersecting = entries[0]?.isIntersecting;
        if (isIntersecting) {
          fetchNextPage();
        }
      };
      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0,
      });
      observer.observe(loadingRef.current!);
    }
  }, [isMounted]);

  return {
    isLoading,
    hasNextPage,
    groupedData,
    loadingRef
  };
};
