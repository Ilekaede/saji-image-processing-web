import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type MainContentProps = BoxProps & {
  children: ReactNode;
};

const MotionBox = motion(Box);

const MainContent = ({ children, ...rest }: MainContentProps) => {
  return (
    <Box
      as="main"
      flex={1}
      p={8}
      ml={{ base: 0, md: 64 }} // Match Sidebar width
      pt={24} // Header height + padding
      minH="calc(100vh - 60px)" // Ensure footer sticks to bottom if content is short
      {...rest}
    >
      <MotionBox
        maxW="7xl"
        mx="auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // @ts-ignore - framer-motion transition prop conflicts with Chakra UI
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </MotionBox>
    </Box>
  );
};

export default MainContent;
