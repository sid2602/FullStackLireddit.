import { Box } from "@chakra-ui/react";

interface wrapperProps {
  variant?: "small" | "regular";
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
