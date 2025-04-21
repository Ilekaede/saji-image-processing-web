import { Box, Flex } from "@chakra-ui/react";
import Footer from "../footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Box flex="1" pb="60px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" width="100%">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
