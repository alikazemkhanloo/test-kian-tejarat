import { Item } from "@/api/types";
import { useRouter } from "next/router";

type Props = {
    item: Item
}
export const ProductItem = (props: Props) => {
    const {item} = props
    const router = useRouter()
  return (
    <div onClick={() => router.push(`/detail/${item.id}`)}>
      {item.title}
      <img src={item.images?.[0]} className="w-full h-60 object-cover" />
    </div>
  );
};

