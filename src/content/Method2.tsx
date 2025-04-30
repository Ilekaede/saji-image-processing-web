// 背景画像の作成

import React, { useRef } from "react";
import {
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
} from "@chakra-ui/react";

// メタデータの定義
export const methodMetadata = {
  id: 2,
  title: "背景差分法",
  overview:
    "動画から背景情報のみを取り出してみる。固定カメラ案件での活躍が期待できる。",
  tags: ["画像処理", "背景差分法"],
};

const Method2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const data = [
    {
      name: "フレーム間差分",
      features: "直近フレーム間の画素差を利用。実装が最も簡単。",
      update: "なし（静的背景想定）",
    },
    {
      name: "平均値法",
      features: "移動平均で背景を学習。徐々に変化に適応。",
      update: "B_t = (1 - α) B_{t-1} + α I_t",
    },
    {
      name: "混合ガウスモデル",
      features: "各画素を複数のガウス分布で表現。影やノイズに強い。",
      update: "各ガウスの重み・平均・分散を逐次更新",
    },
    {
      name: "KNN法",
      features: "近傍サンプル集合で背景を推定。動的背景に対応。",
      update: "サンプル集合をスライド更新",
    },
  ];

  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        背景差分とは？
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        背景差分は、動画内の動体を検出するための手法で、背景と前景を分離することを目的としています。主に固定カメラで撮影された動画に対して使用されます。背景差分法は、以下のような手順で動体を検出します。
      </Text>
      <ol>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            背景モデルの構築
          </Text>
          <Text fontSize="xl">
            動画の最初の数フレームを使用して、背景モデルを構築します。背景モデルは、静止した物体の平均値や中央値を計算することで作成されます。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            前景抽出
          </Text>
          <Text fontSize="xl">
            各フレームと背景モデルを比較し、差分を計算します。差分が一定の閾値を超えた部分が前景として抽出されます。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            後処理
          </Text>
          <Text fontSize="xl">
            前景マスクに対してモルフォロジー処理やノイズ除去を行い、動体を強調します。
          </Text>
          <Text fontSize="xl">
            このような手法で前景を抽出するだけでなく、背景を補完することも可能です。背景を補完することで、動体がない状態の映像を生成することができます。
          </Text>
        </li>
      </ol>
      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        背景分離アルゴリズムの種類
      </Text>
      <Text fontSize="xl">
        背景差分法にはいくつかのバリエーションがあります。以下は代表的なものです
      </Text>
      <br />
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Heading size="md" mb={4}>
          背景差分法の代表的アルゴリズム
        </Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>手法</Th>
                <Th>特徴</Th>
                <Th>モデル更新</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => (
                <Tr key={row.name}>
                  <Td>{row.name}</Td>
                  <Td>{row.features}</Td>
                  <Td whiteSpace="pre-wrap">{row.update}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <br />
      <Text fontSize="xl">
        ボールが転がる動画に対して背景差分法を利用し、前景と背景を分離した例を示します。
      </Text>

      <VStack spacing={4} mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          前景と背景を分離した結果
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
          {/* <source src="/videos/comparison.mp4" type="video/mp4" /> */}
          <source src="/videos/comparison.webm" type="video/webm" />
          お使いのブラウザは動画の再生に対応していません。
        </Box>
        <Text fontSize="md" color="gray.600">
          左：元映像　中央：背景　右：前景
        </Text>
      </VStack>
      <br />
      <Text fontSize="xl">
        カメラで撮影されたボールの動きを分離して、前景として出力しています。一方、背景は前フレームの情報を利用して補完した結果が出力されており、ボールのない映像が出力されています。
      </Text>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        課題
      </Text>
      <ol>
        <li>
          <Text fontSize="xl">
            前景・背景アルゴリズムの実装を行いなさい。背景差分法を用いて、動画から動体を検出するプログラムを作成してください。
          </Text>
        </li>
        <li>
          <Text fontSize="xl">
            実際に動画を利用して背景差分法を適用してください。その中で、精度良く動体を検出する、もしくは背景を作成するための工夫を考えてください。
          </Text>
        </li>
        <li>
          <Text fontSize="xl">
            背景画像の生成には前フレーム数が必要です。前フレーム数を増やすことで、背景画像の精度は向上しますが、計算量も増加します。逆に減らした際には、計算量は減りますが、精度が低下します。背景分離をリアルタイムで実装する場合には、前フレーム数をどのように設定するのが良いか考えてみてください。
          </Text>
        </li>
      </ol>
    </Box>
  );
};

export default Method2;
