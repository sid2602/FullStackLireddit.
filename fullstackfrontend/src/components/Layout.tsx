import Wrapper, { WrapperVariant } from "../components/Wrapper";
import Navbar from "./Navbar";

interface layoutProps {
  variant?: WrapperVariant;
}

const layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default layout;
