import { Item } from "@/api/types";
import { useGetInfinitItems } from "@/api/useGetItems";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { Header } from "../components/Header";
import { headerHeight } from "@/constants";
import { NextPage } from "next";
import { DateHeader } from "../components/DateHeader";
import { useHome } from "../hooks/useHome";

export const Home: NextPage = () => {
  const { groupedData, hasNextPage, isLoading, loadingRef } = useHome();

  if(isLoading){
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div style={{ paddingTop: headerHeight }}>
        {groupedData?.map((group) => {
          return (
            <div>
              <DateHeader date={group.date} />
              {group.data.map((item) => {
                return <ProductItem item={item} />;
              })}
            </div>
          );
        })}
        {hasNextPage && (
          <div ref={loadingRef}>
            loading ... (hasNextPage in this example will always be true because
            of not using a proper mock api)
          </div>
        )}
      </div>
    </div>
  );
};
