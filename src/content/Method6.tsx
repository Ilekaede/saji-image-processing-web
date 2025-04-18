// 特徴点マッチングについて

import React, { useRef, useState } from "react";
import { Box, Text, VStack, Button, HStack } from "@chakra-ui/react";

// メタデータの定義
export const methodMetadata = {
  id: 6,
  title: "特徴点マッチング",
  overview: "特徴点マッチングを使ってみよう",
  tags: ["画像処理", "特徴点マッチング"],
};

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
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        {methodMetadata.overview}
      </Text>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        特徴点マッチングの基本概念
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        特徴点マッチングは主に以下の2つのステップで構成されます：
      </Text>
      <ol>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            特徴点の検出
          </Text>
          <Text fontSize="xl">
            画像内の特徴的な点（コーナー、エッジ、ブロブなど）を検出します。代表的な特徴点検出器には、SIFT、SURF、ORB、AKAZEなどがあります。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            特徴点のマッチング
          </Text>
          <Text fontSize="xl">
            異なる画像間で、対応する特徴点同士を結びつけます。通常、特徴点の記述子（ディスクリプタ）の類似度に基づいてマッチングを行います。
          </Text>
        </li>
      </ol>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        代表的な特徴点検出器
      </Text>
      <ol>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            SIFT (Scale-Invariant Feature Transform)
          </Text>
          <Text fontSize="xl">
            スケールや回転に不変な特徴点を検出します。高い精度と安定性を持ちますが、計算コストが高いという欠点があります。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            SURF (Speeded-Up Robust Features)
          </Text>
          <Text fontSize="xl">
            SIFTの高速版として開発されました。計算効率が良く、実時間処理に適しています。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            ORB (Oriented FAST and Rotated BRIEF)
          </Text>
          <Text fontSize="xl">
            高速で実用的な特徴点検出器です。特許の問題がないため、広く利用されています。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            AKAZE (Accelerated-KAZE)
          </Text>
          <Text fontSize="xl">
            非線形スケール空間を使用し、高い精度と安定性を持ちながら、比較的高速に動作します。
          </Text>
        </li>
      </ol>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        特徴点マッチングの応用例
      </Text>
      <ol>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            画像の位置合わせ
          </Text>
          <Text fontSize="xl">
            異なる視点から撮影された画像を位置合わせし、パノラマ画像の作成などに利用されます。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            物体追跡
          </Text>
          <Text fontSize="xl">
            動画内で物体を追跡する際に、特徴点のマッチングを利用して物体の位置を推定します。
          </Text>
        </li>
        <li>
          <Text fontSize="xl" fontWeight="bold">
            3D再構成
          </Text>
          <Text fontSize="xl">
            複数の画像から3Dモデルを再構成する際に、特徴点のマッチングが重要な役割を果たします。
          </Text>
        </li>
      </ol>

      <br />
      <Text fontSize="xl">
        動画に対して特徴点マッチングを行うことで、任意の物体に対し、追跡処理を行うことができます。
      </Text>

      <VStack spacing={4} mt={4}>
        <Text fontSize="xl" fontWeight="bold">
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
          <source src="/videos/output.mp4" type="video/mp4" />
          <source src="/videos/output.webm" type="video/webm" />
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
            onClick={() => handleSpeedChange(0.75)}
            border={currentSpeed === 0.75 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            0.75x
          </Button>
          <Button
            size="sm"
            onClick={() => handleSpeedChange(1.0)}
            border={currentSpeed === 1.0 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            1.0x
          </Button>
          <Button
            size="sm"
            onClick={() => handleSpeedChange(1.5)}
            border={currentSpeed === 1.5 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            1.5x
          </Button>
          <Button
            size="sm"
            onClick={() => handleSpeedChange(2.0)}
            border={currentSpeed === 2.0 ? "2px solid" : "none"}
            borderColor="blue.500"
          >
            2.0x
          </Button>
        </HStack>
        <Text fontSize="md" color="gray.600">
          カメラで撮影されたボールの動きを、AKAZE特徴量マッチングを使用して追跡しています。
        </Text>
      </VStack>

      <Text as="h2" fontSize="2xl" fontWeight="bold" fontFamily="Arial" mt={4}>
        課題
      </Text>
      <ol>
        <li>
          <Text fontSize="xl">
            異なる特徴点検出器（SIFT、SURF、ORB、AKAZE）の性能を比較し、それぞれの利点と欠点をまとめなさい。
          </Text>
        </li>
        <li>
          <Text fontSize="xl">
            特徴点マッチングの精度に影響を与える要因（照明条件、視点の変化、ノイズなど）について考察しなさい。
          </Text>
        </li>
        <li>
          <Text fontSize="xl">
            動画ではボールでない背景から特徴点が大量に検出されているという課題がある。これを解決するにはどのような処理が考えられるか。
          </Text>
        </li>
      </ol>
    </Box>
  );
};

export default Method6;
