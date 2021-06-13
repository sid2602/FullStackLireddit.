import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface wrapperProps {
  variant?: WrapperVariant;
}

const wrapper: React.FC<wrapperProps> = ({ variant = "regular", children }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default wrapper;
