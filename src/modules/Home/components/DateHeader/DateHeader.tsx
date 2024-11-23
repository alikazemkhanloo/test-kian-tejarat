import { headerHeight } from "@/constants";

type Props = {
  date: string;
};

export const DateHeader = (props: Props) => {
  return (
    <div
      style={{ top: headerHeight }}
      className="sticky  left-0 right-0 flex flex-row justify-center"
    >
      <div className="bg-gray-500 my-1 rounded-full py-1 px-2">{props.date}</div>
    </div>
  );
};
