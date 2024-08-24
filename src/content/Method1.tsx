// 二値化について

import React from "react";
import { Box, Text } from "@chakra-ui/react";
const Method1 = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        2値化
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        2 値化は画像処理の基礎的な手法で、画像を黒と白の 2
        色に分けます。特定の閾値を設定し、それに基づいて各ピクセルの色を決定します。
      </Text>
    </Box>
  );
};

export default Method1;
