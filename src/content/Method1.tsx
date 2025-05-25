// 二値化について

import React from "react";
import { Box, Text, Image, List, ListItem, Flex } from "@chakra-ui/react";
import abemaBagThreshold from "../components/image/abemaBag_threshold.jpg";

// メタデータの定義
export const methodMetadata = {
  id: 1,
  title: "2値化",
  overview: "",
  tags: ["画像処理", "2値化"],
  image: abemaBagThreshold,
};

const Method1 = () => {
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
        mb={8}
      >
        <Box flex="1">
          <Text
            as="h1"
            fontSize="3xl"
            fontWeight="bold"
            fontFamily="Arial"
            mb={2}
          >
            {methodMetadata.title}
          </Text>
        </Box>
        {/* <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={abemaBagThreshold}
            alt="2値化処理の結果例"
            maxH="300px"
            maxW="300px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box> */}
      </Flex>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        2値化は画像処理の基礎的な手法で、画像を黒と白の2色に分けます．特定の閾値を設定し、それに基づいて各ピクセルの色を決定します。画素値というよりは数値に対して使用する印象があり、単に色彩だけでなく、輝度や明度といった数値データに対して処理することもできます。
      </Text>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        例えば、Rチャンネルでの閾値、Gチャンネルの閾値、Bチャンネルの閾値を設定することで2値化を複数チャンネルに対して行うことができます。しかし、その分条件は細かく設定する(マジックナンバーが多い状態)必要があるため、汎用性は落ちます。また、組み合わせ等の検討も必要であるため、現実的ではないと言わざるを得ません。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        2値化の閾値決定アルゴリズムについて
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        判別分析法（大津の2値化）
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
        大津の2値化とも呼ばれ、ヒストグラムのクラス間分散が最大となる値を閾値として決定するアルゴリズムです。以下のような処理を行うことで閾値の最適化が行われます。
      </Text>

      <List spacing={3} styleType="decimal" pl={4} mb={6}>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            各強度レベルのヒストグラムと確率を計算する。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            2つのクラス間分散の確率とクラス分散平均を用いて初期値を決定する。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            閾値を0から255(画素値の最小から最大)までループし、その中で次のステップを行う。
          </Text>
          <List spacing={2} styleType="circle" pl={6} mt={2}>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                分散の確率とクラスの分散平均を更新する。
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                クラス分散を計算し、最大であるか比較を行う。
              </Text>
            </ListItem>
          </List>
        </ListItem>
      </List>

      <Box display="flex" justifyContent="center" my={8}>
        <Image
          src={abemaBagThreshold}
          alt="判別分析法による2値化処理の結果"
          maxH="400px"
          borderRadius="md"
          boxShadow="md"
        />
      </Box>
    </Box>
  );
};

export default Method1;
