"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ md: "space-between" }}
        align={{ md: "center" }}
      >
        <Text>
          {" "}
          &emsp;&emsp;&emsp;&emsp;&emsp; © 2024 Hitoshi Sauji. All rights
          reserved
        </Text>
      </Container>
    </Box>
  );
};
export default Footer;
