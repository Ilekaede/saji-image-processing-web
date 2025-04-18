import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type MainContentProps = BoxProps & {
  children: ReactNode;
};

const MainContent = ({ children, ...rest }: MainContentProps) => {
  return (
    <Box as="main" flex={1} p={4} ml={{ base: 0, md: 60 }} mt={16} {...rest}>
      {children}
    </Box>
  );
};

export default MainContent;
