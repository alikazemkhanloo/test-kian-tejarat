import { useGetItem } from "@/api/useGetItem";
import { NextPage } from "next";

type Props = {
  productId: string;
};
export const Detail: NextPage<Props> = (props) => {
  const { data, error, isLoading } = useGetItem(Number(props.productId));

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error occured</div>;
  }

  return (
    <div>
      <div>Title: {data?.title}</div>
      <div>Description: {data?.description}</div>
      <div>Price: {data?.price}</div>
    </div>
  );
};
