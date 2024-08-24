// 特徴点抽出について

import React from "react";
import { Box, Text } from "@chakra-ui/react";
const Method1 = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        特徴点抽出
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        特徴点抽出は,
        画像の中から重要なポイントや特徴的な部分を抽出する技術です.
      </Text>
    </Box>
  );
};

export default Method1;
