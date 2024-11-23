import { Item } from "@/api/types";
import { useInfinitItems } from "@/api/useItems";
import { useMemo } from "react";
import { ProductItem } from "../components/ProductItem";
import { Header } from "../components/Header";
import { headerHeight } from "@/constants";

type GroupedData = { date: string; data: Item[] };

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitItems();

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

  return (
    <div >
      <Header />
      <div style={{ paddingTop: headerHeight }}>
        {groupedData?.map((group) => {
          return (
            <div>
              <div style={{top: headerHeight}} className="sticky bg-black">{group.date}</div>
              {group.data.map((item) => {
                return <ProductItem item={item} />;
              })}
            </div>
          );
        })}
        <button onClick={() => fetchNextPage()}>load more</button>
      </div>
    </div>
  );
};
