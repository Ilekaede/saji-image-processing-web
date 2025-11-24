// 特徴点マッチングについて

import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  List,
  ListItem,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";

// メタデータの定義
export const methodMetadata = {
  id: 6,
  title: "特徴点マッチング",
  overview: "特徴点マッチングを使ってみよう",
  tags: ["画像処理", "特徴点マッチング"],
};

const detectorData = [
  {
    name: "SIFT",
    features: "スケール・回転不変。高精度・高安定性。",
    merit: "高精度・安定性",
    demerit: "計算コスト高・特許制約あり",
  },
  {
    name: "SURF",
    features: "SIFTの高速版。実時間処理向き。",
    merit: "高速・実用的",
    demerit: "特許制約あり・SIFTより精度やや低い",
  },
  {
    name: "ORB",
    features: "高速・特許フリー。実用的。",
    merit: "高速・特許フリー",
    demerit: "精度はSIFT/SURFにやや劣る",
  },
  {
    name: "AKAZE",
    features: "非線形スケール空間。高精度・比較的高速。",
    merit: "高精度・比較的高速",
    demerit: "一部特徴に弱い場合あり",
  },
];

const Method6 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setCurrentSpeed(speed);
    }
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
        mb={8}
      >
        <Text
          as="h1"
          fontSize="3xl"
          fontWeight="bold"
          fontFamily="Arial"
          mb={4}
        >
          {methodMetadata.title}
        </Text>
      </Flex>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        {methodMetadata.overview}
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        特徴点マッチングの基本概念
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
        特徴点マッチングは主に以下の2つのステップで構成されます：
      </Text>
      <List spacing={4} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            特徴点の検出
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            画像内の特徴的な点（コーナー、エッジ、ブロブなど）を検出します。代表的な特徴点検出器には、SIFT、SURF、ORB、AKAZEなどがあります。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            特徴点のマッチング
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            異なる画像間で、対応する特徴点同士を結びつけます。通常、特徴点の記述子（ディスクリプタ）の類似度に基づいてマッチングを行います。
          </Text>
        </ListItem>
      </List>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
        <Heading size="md" mb={4}>
          特徴点検出器の比較表
        </Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>手法</Th>
                <Th>特徴</Th>
                <Th>主な利点</Th>
                <Th>主な欠点</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detectorData.map((row) => (
                <Tr key={row.name}>
                  <Td>{row.name}</Td>
                  <Td>{row.features}</Td>
                  <Td>{row.merit}</Td>
                  <Td>{row.demerit}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        特徴点マッチングの応用例
      </Text>
      <List spacing={4} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            画像の位置合わせ
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            異なる視点から撮影された画像を位置合わせし、パノラマ画像の作成などに利用されます。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            物体追跡
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            動画内で物体を追跡する際に、特徴点のマッチングを利用して物体の位置を推定します。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            3D再構成
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            複数の画像から3Dモデルを再構成する際に、特徴点のマッチングが重要な役割を果たします。
          </Text>
        </ListItem>
      </List>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        動画に対して特徴点マッチングを行うことで、任意の物体に対し、追跡処理を行うことができます。
      </Text>

      <VStack spacing={4} mt={4} mb={8}>
        <Text fontSize="lg" fontWeight="bold">
          AKAZE特徴量マッチングによる物体追跡の例
        </Text>
        <Box
          as="video"
          ref={videoRef}
          controls
          width="800px"
          height="450px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <source src={`${process.env.PUBLIC_URL}/videos/output.mp4`} type="video/mp4" />
          <source src={`${process.env.PUBLIC_URL}/videos/output.webm`} type="video/webm" />
          お使いのブラウザは動画の再生に対応していません。
        </Box>
        <HStack spacing={2}>
          <Text fontSize="md">再生速度:</Text>
          <Button
            size="sm"
            onClick={() => handleSpeedChange(0.5)}
            border={currentSpeed === 0.5 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            0.5x
          </Button>
          <Button
            size="sm"
            onClick={() => handleSpeedChange(1.0)}
            border={currentSpeed === 1.0 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            1.0x
          </Button>
        </HStack>
        <Text fontSize="md" color="gray.600">
          カメラで撮影されたボールの動きを、AKAZE特徴量マッチングを使用して追跡しています。
        </Text>
      </VStack>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        課題
      </Text>
      <List spacing={3} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          異なる特徴点検出器（SIFT、SURF、ORB、AKAZE）の性能を比較し、それぞれの利点と欠点をまとめなさい。
        </ListItem>
        <ListItem>
          特徴点マッチングの精度に影響を与える要因（照明条件、視点の変化、ノイズなど）について考察しなさい。
        </ListItem>
        <ListItem>
          動画ではボールでない背景から特徴点が大量に検出されているという課題がある。これを解決するにはどのような処理が考えられるか。
        </ListItem>
      </List>
    </Box>
  );
};

export default Method6;
