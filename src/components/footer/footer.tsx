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
      borderColor={useColorModeValue("slate.200", "slate.700")}
      bg={useColorModeValue("white", "slate.900")}
      color={useColorModeValue("slate.600", "slate.400")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={6}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="center"
        align="center"
      >
        <Text fontSize="sm">
          © 2024 Hitoshi Sauji. All rights reserved
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
