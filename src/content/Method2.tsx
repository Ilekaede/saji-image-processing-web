// 特徴点抽出について

import React from "react";
import { Box, Text } from "@chakra-ui/react";

// メタデータの定義
export const methodMetadata = {
  id: 2,
  title: "背景画像の作成",
  overview:
    "画像の蓄積で背景画像を作成することができます。そのアルゴリズムを覗いてみましょう",
  tags: ["画像処理", "背景画像"],
};

const Method2 = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        {methodMetadata.overview}
      </Text>
      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial">
        実際の使用例
      </Text>
      <Text>背景画像について記述するよ〜</Text>
    </Box>
  );
};

export default Method2;
