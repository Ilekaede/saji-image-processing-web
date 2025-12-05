// ノイズ除去について

import React, { useState } from "react";
import {
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
  List,
  ListItem,
  Image,
  Flex,
} from "@chakra-ui/react";
import Blur from "../components/methodDetail/Blur";
import Median from "../components/methodDetail/Median";
import Lenna from "../components/image/lenna.bmp";
import BlurImage from "../components/image/2_move.png";
import MedianImage from "../components/image/2_median.png";

// メタデータの定義
export const methodMetadata = {
  id: 5,
  title: "ノイズ除去を除去したい -フィルタ編-",
  overview: "なかなか注目がいかないノイズ除去について述べる．実はかなり重要",
  tags: ["画像処理", "ノイズ"],
  image: Lenna,
  searchableContent: "ノイズ除去 フィルタ ガウシアンフィルタ メディアンフィルタ 平滑化 smoothing デノイジング ぼかし blur",
};

const Method5 = () => {
  const [processTriggerBlur, setProcessTriggerBlur] = useState<boolean>(false);
  const [processTriggerMedian, setProcessTriggerMedian] =
    useState<boolean>(false);
  const [kernelSizeBlur, setKernelSizeBlur] = useState<number>(10);
  const [kernelSizeMedian, setKernelSizeMedian] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const handleKernelSizeBlurChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setKernelSizeBlur(valueAsNumber);
  };

  const handleKernelSizeMedianChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    if (valueAsNumber % 2 === 0) {
      setError("カーネルサイズは奇数でなければなりません");
    } else {
      setError(null);
    }
    setKernelSizeMedian(valueAsNumber);
  };

  const handleProcessImageBlur = () => {
    setProcessTriggerBlur(!processTriggerBlur);
  };

  const handleProcessImageMedian = () => {
    setProcessTriggerMedian(!processTriggerMedian);
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
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={Lenna}
            alt="ノイズ除去の例画像"
            maxH="300px"
            maxW="300px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        なぜノイズを除去する必要があるのか
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        ノイズは撮影環境やセンサーの特性、画像圧縮など様々な要因で発生します。画像に含まれる不要なノイズ（ランダムな輝度や色の変動）を取り除き、画像の品質を向上させることは、画像内で必要となる情報の探しやすさにつながり、
        <strong>画像処理の精度向上</strong>
        につながります。ノイズ除去は、画像解析やコンピュータビジョンの
        <u>前処理</u>として非常に重要なのです。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        フィルタリング処理
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        画像にフィルタリング処理を施すことで、ノイズを一定低減することができます。フィルタの種類は様々で、目的に合ったフィルタを選ぶことが重要になってきます。
      </Text>

      <List spacing={6} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            平均フィルタ（Mean Filter）
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={2}>
            各ピクセルの値を周囲のピクセルの平均値で置き換えます。画像全体が
            <strong>滑らかな濃淡</strong>
            となるため、ノイズなどの不要な濃淡変動を軽減することができます。
          </Text>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <Text mb={2}>カーネルサイズを指定:</Text>
              <NumberInput
                value={kernelSizeBlur}
                onChange={handleKernelSizeBlurChange}
                min={1}
                max={30}
                size="sm"
                width="100px"
                allowMouseWheel={false}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={handleProcessImageBlur} mt={3}>
                {processTriggerBlur ? "元画像に戻す" : "平均化フィルタをつける"}
              </Button>
              <Blur
                imageFile={Lenna}
                processTrigger={processTriggerBlur}
                kernelSize={kernelSizeBlur}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                src={BlurImage}
                width="300px"
                height="auto"
                alt="平均化フィルタ後の画像"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>
          </SimpleGrid>
          <Text fontSize="md" lineHeight="1.8" mt={4}>
            平均化フィルタは非常にシンプルかつ簡単にノイズを低減できますが、同時に画像のエッジも低減してしまうという欠点があります。そのため、画像内の物体検出を行う際には、エッジを保存しつつ平滑化する必要があります。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            中央値フィルタ（Median Filter）
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={2}>
            各ピクセルの値を周囲のピクセルの中央値で置き換えます。
          </Text>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <Text mb={2}>カーネルサイズを指定:</Text>
              <NumberInput
                value={kernelSizeMedian}
                onChange={handleKernelSizeMedianChange}
                min={1}
                max={30}
                size="sm"
                width="100px"
                allowMouseWheel={false}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {/* エラーメッセージ領域を固定高さで確保してレイアウトシフトを防止 */}
              <Box minHeight="60px" mt={2}>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              </Box>
              <Button onClick={handleProcessImageMedian} mt={3}>
                {processTriggerMedian
                  ? "元画像に戻す"
                  : "メディアンフィルタをつける"}
              </Button>
              <Median
                imageFile={Lenna}
                processTrigger={processTriggerMedian}
                kernelSize={kernelSizeMedian}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                src={MedianImage}
                width="300px"
                height="auto"
                alt="中央値フィルタ後の画像"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>
          </SimpleGrid>
        </ListItem>
      </List>

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
          2つのフィルタのカーネルサイズを変化させ、その実験結果からわかることをまとめなさい。
        </ListItem>
        <ListItem>
          これらの違いが画像処理においてどのような利点となるか、考察しなさい。
        </ListItem>
        <ListItem>
          他にはどのようなフィルタがあるのか調べ、まとめなさい。その際、他フィルターとの比較や、実際の使用例も入れること。
        </ListItem>
      </List>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        ノイズの低減は、同時に画像内のエッジがぼやけることにつながります。2つはトレードオフであるため、どのようなバランスでノイズを減らしていくかは十分に検討を重ねる必要があります。
        例えば、<strong>ガウシアンフィルタ</strong>
        は注目画素をガウス関数に基づく重み付け平均で置き換えます。これにより、ノイズを滑らかに除去しつつ、エッジを比較的綺麗に残すことができます。
      </Text>
    </Box>
  );
};
export default Method5;
