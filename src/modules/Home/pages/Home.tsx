import { Item } from "@/api/types";
import { useInfinitItems } from "@/api/useItems";
import { useMemo } from "react";
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
    return result
  }, [data]);
  
  return (
    <div>
      {groupedData?.map((group) => {
        return (
          <div>
            <div className="sticky top-0 bg-black">{group.date}</div>
            {group.data.map((item) => {
              return (
                <div>
                  {item.title}
                  <img
                    src={item.images?.[0]}
                    className="w-full h-60 object-cover"
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <button onClick={() => fetchNextPage()}>load more</button>
    </div>
  );
};
