import { getQueryClient } from "@/api/getQueryClient";
import { fetchItem } from "@/api/useGetItem";
import { Detail } from "@/modules/Detail";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

Detail.getInitialProps = async ({ query }) => {
  const queryClient = getQueryClient();
  const id = query.id;
  if (!id) {
    // todo: redirect to 404
  }

  await queryClient.prefetchQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(Number(id)),
  });


  return {
    dehydratedState: dehydrate(queryClient),
    productId: id as string,
  };
};

export default Detail;
