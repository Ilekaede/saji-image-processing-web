import React, { useRef } from "react";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Stack,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlayCircle } from "react-icons/fa";
import lenna from "../components/image/lenna.bmp";
import lennaHist from "../components/image/lenna_hist.png";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

/**
 * Manual – visually‑enhanced version (TypeScript friendly)
 */
const Manual = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bg = useColorModeValue("gray.50", "gray.800");
  const accent = useColorModeValue("blue.500", "blue.300");

  return (
    <Box px={{ base: 4, md: 10 }} py={8} bg={bg}>
      {/* ---------- Hero ---------- */}
      <VStack spacing={3} textAlign="center" mb={10}>
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          学んでおきたい<span style={{ color: accent }}>基礎知識</span>
        </Text>
        <Divider w={20} borderColor={accent} />
      </VStack>

      {/* ---------- 1. 画像処理の定義 ---------- */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        alignItems="center"
        mb={16}
      >
        <VStack align="start" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            画像処理の定義
          </Text>
          <Text fontSize="md" lineHeight={1.9}>
            <strong>画像処理（Image Processing）</strong>
            とは、デジタル画像を入力として、画像の画質改善や特徴抽出、解析、あるいは画像変換を行い、目的に応じた画像や数値情報を得る一連の技術・手法を指します。
            コンピュータビジョンや機械学習などの分野で広く応用されています。
          </Text>
          <Text fontSize="sm" color="gray.500">
            例：医療画像診断・自動運転・リモートセンシング など
          </Text>
        </VStack>
        <VStack>
          <Image
            src={lenna}
            alt="Lenna"
            borderRadius="lg"
            boxShadow="lg"
            maxH="260px"
            objectFit="cover"
          />
          <Text fontSize="sm" color="gray.500">
            画像処理分野の標準テスト画像（Lenna）
          </Text>
        </VStack>
      </SimpleGrid>

      {/* ---------- 2. デジタル画像とは ---------- */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        alignItems="center"
        mb={16}
      >
        {/* 画像列（左側 on desktop） */}
        <VStack order={{ base: 2, md: 1 }}>
          <Image
            src={lennaHist}
            alt="Lenna Histogram"
            borderRadius="lg"
            boxShadow="lg"
            maxH="260px"
            objectFit="contain"
            bg="white"
          />
          <Text fontSize="sm" color="gray.500">
            Lenna の RGB ヒストグラム
          </Text>
        </VStack>
        {/* テキスト列 */}
        <VStack align="start" spacing={4} order={{ base: 1, md: 2 }}>
          <Text fontSize="2xl" fontWeight="bold">
            デジタル画像とは
          </Text>
          <Text fontSize="md" lineHeight={1.9}>
            デジタル画像は均一格子状に並んだ画素（Pixel）の集合で、離散 2
            次元座標の行列として表されます。
            <BlockMath
              math={"I = [I(x, y)]\\quad(x=1\\ldots W,\\;y=1\\ldots H)"}
            />
            各画素値 <InlineMath math={"I(x, y)"} /> は色（RGB
            など）だけでなく、標高や近赤外強度などシーンに応じた実数を格納することもできます。
          </Text>
          <Text fontSize="md">
            1 画素は通常 8 ビット（0–255）で表現され、0 に近いほど黒、255
            に近いほど白。赤・緑・青の 3
            チャンネルを持たせることでフルカラー画像になります。
          </Text>
          <Text fontSize="md">
            ヒストグラムを取ることで「赤みが強い」などの定量情報を可視化できます。
          </Text>
        </VStack>
      </SimpleGrid>

      {/* ---------- 3. 動画像について ---------- */}
      <Stack spacing={6} mb={12}>
        <Text fontSize="2xl" fontWeight="bold">
          動画像について
        </Text>
        <Text fontSize="md" lineHeight={1.9}>
          動画は連続したフレーム（frame）の集合で、それぞれのフレームは静止画として扱えます。fps（frame
          per second）は 1 秒間に表示されるフレーム数を示します。
        </Text>
        <Text fontSize="md">
          動画像処理では時間軸の情報を利用し、移動物体の検出や 3D
          形状推定などが可能になります。
        </Text>
      </Stack>

      {/* ---------- Video Section ---------- */}
      <Box
        position="relative"
        maxW="800px"
        mx="auto"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="2xl"
      >
        <Box
          as="video"
          ref={videoRef}
          controls
          width="100%"
          height="auto"
          _hover={{ filter: "none" }}
          filter="brightness(0.9)"
        >
          <source src="/videos/raccoon_tracked_cutted.mp4" type="video/mp4" />
        </Box>
        <Icon
          as={FaPlayCircle}
          boxSize={16}
          color="whiteAlpha.800"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          pointerEvents="none"
        />
      </Box>
      <Text align="center" fontSize="sm" color="gray.600" mt={2}>
        かわいいレッサーパンダ @ 浜松市動物園
      </Text>

      {/* ---------- Closing ---------- */}
      <Box mt={16}>
        <Text fontSize="md" lineHeight={1.9}>
          佐治研究室では、これら画像処理技術を活用した道路定点カメラやドライブレコーダー映像による車両追跡研究が盛んに行われています。
        </Text>
      </Box>
    </Box>
  );
};

export default Manual;
