import { useInfinitItems } from "@/api/useItems";
import { useMemo } from "react";

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitItems();

  const flatData = useMemo(() => {
    return data?.pages?.flat(1);
  }, [data]);

  return (
    <div>
      {flatData?.map((item, index) => {
        return (
          <>
            {item.creationAt != flatData[index - 1]?.creationAt && (
              <div className="sticky top-0 bg-black">{item.creationAt}</div>
            )}
            <div>
              {item.title}
              <img
                src={item.images?.[0]}
                className="w-full h-60 object-cover"
              />
            </div>
          </>
        );
      })}
      <button onClick={() => fetchNextPage()}>load more</button>
    </div>
  );
};
