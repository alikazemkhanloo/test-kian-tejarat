import { headerHeight } from "@/constants";

type Props = {
}
export const Header = (props: Props) => {
  return (
    <div className="fixed bg-gray-500 z-10 top-0 left-0 right-0" style={{height: headerHeight}}>
      Header
    </div>
  );
};

