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
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        {methodMetadata.overview}
      </Text>
      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
        なぜノイズを除去する必要があるのか
      </Text>
      <Text>
        ノイズは撮影環境やセンサーの特性，画像圧縮など様々な要因で発生します．画像に含まれる不要なノイズ(ランダムな輝度や色の変動)を取り除き，画像の品質を向上させることは，画像内で必要となる情報の探しやすさにつながり，
        <strong>画像処理の精度向上</strong>
        につながります．
        <br />
        ノイズ除去は，画像解析やコンピュータビジョンの<u>前処理</u>
        として非常に重要なのです．
        <br />
      </Text>
      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
        <li>フィルタリング処理</li>
      </Text>
      <Text>
        画像にフィルタリング処理を施すことで，ノイズを一定低減することができます．フィルタの種類は様々で，目的に合ったフィルタを選ぶことが重要になってきます．
        <br />
      </Text>
      <ul>
        <li>
          <br />
          <strong>1. 平均フィルタ（Mean Filter）</strong>:
          各ピクセルの値を周囲のピクセルの平均値で置き換えます．画像全体が
          <strong>滑らかな濃淡</strong>
          となるため，ノイズなどの不要な濃淡変動を軽減することができます．
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
            <Box mt={200}>
              <img
                src={BlurImage}
                width="500px"
                height="300px"
                alt="lenna.bmp"
              />
            </Box>
          </SimpleGrid>
        </li>
        <li>
          <br />
          <Text>
            平均化フィルタは非常にシンプルかつ簡単にノイズを低減できますが，同時に画像のエッジも低減していまうという欠点があります．
            <br />
            そのため，画像内の物体検出を行う際には，エッジを保存しつつ平滑化する必要があります．
          </Text>
          <br />
          <strong>2．中央値フィルタ（Median Filter）</strong>:
          各ピクセルの値を周囲のピクセルの中央値で置き換えます。
          <SimpleGrid columns={2}>
            <Box>
              <Text mb={2}>カーネルサイズを指定:</Text>
              <NumberInput
                value={kernelSizeMedian}
                onChange={handleKernelSizeMedianChange}
                min={1}
                max={30}
                size="sm"
                width="100px"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {error && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
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
            <Box mt={200}>
              <img src={MedianImage} width={500} height={300} alt="lenna.bmp" />
            </Box>
          </SimpleGrid>
        </li>
      </ul>
      <br />
      <Text fontWeight="bold">課題</Text>
      <ul>
        <li>
          1.
          2つのフィルタのカーネルサイズを変化させ，その実験結果からわかることをまとめなさい．
        </li>
        <li>
          2.
          これらの違いが画像処理においてどのような利点となるか，考察しなさい．
        </li>
        <li>
          3.
          他にはどのようなフィルタがあるのか調べ，まとめなさい．その際，他フィルターとの比較や，実際の使用例も入れること．
        </li>
      </ul>
      <br />

      <Text>
        ノイズの低減は，同時に画像内のエッジがぼやけることにつながります．2つはトレードオフであるため，どのようなバランスでノイズを減らしていくかは十分に検討を重ねる必要があります．
        <br />
        例えば，<strong>ガウシアンフィルタ</strong>
        は注目画素をガウス関数に基づく重み付け平均で置き換えます．これにより，ノイズを滑らかに除去しつつ，エッジを比較的綺麗に残すことができます.
      </Text>
    </Box>
  );
};
export default Method5;
