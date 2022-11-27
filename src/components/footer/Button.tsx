import HiddenButtons from "./HiddenButtons";
import LeftButtons from "./LeftButtons";

type Props = {};

const Button = (props: Props) => {
  return (
    <>
      <LeftButtons />
      <HiddenButtons />
    </>
  );
};

export default Button;
