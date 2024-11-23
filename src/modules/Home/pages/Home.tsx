import { Item } from "@/api/types";
import { useGetInfinitItems } from "@/api/useGetItems";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { Header } from "../components/Header";
import { headerHeight } from "@/constants";
import { NextPage } from "next";

type GroupedData = { date: string; data: Item[] };

export const Home: NextPage = () => {
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

  return (
    <div>
      <Header />
      <div style={{ paddingTop: headerHeight }}>
        {groupedData?.map((group) => {
          return (
            <div>
              <div style={{ top: headerHeight }} className="sticky bg-black">
                {group.date}
              </div>
              {group.data.map((item) => {
                return <ProductItem item={item} />;
              })}
            </div>
          );
        })}
        {/* hasNextPage in this example will always be true because of not using a proper mock api */}
        {hasNextPage && <div ref={loadingRef}>loading ...</div>}
      </div>
    </div>
  );
};
