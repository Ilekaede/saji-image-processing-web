// ハフ変換について

import {
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import HoughTransform from "../components/methodDetail/HoughTransform";
import AbemaBag from "../components/image/abemaBag.jpg";

// メタデータの定義
export const methodMetadata = {
  id: 4,
  title: "ハフ変換",
  overview: "ハフ変換とは〜",
  tags: ["画像処理", "ハフ変換"],
};

const Method4 = () => {
  const [processTrigger, setProcessTrigger] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(50);
  const handleThresholdChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setThreshold(valueAsNumber);
  };

  const handleProcessImage = () => {
    setProcessTrigger(!processTrigger);
  };
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        {methodMetadata.overview}
      </Text>
      <Text mt={3}>
        本稿では主に直線検出のために利用する画像処理で，
        <strong>ハフ変換</strong>
        を取り上げます．佐治研では道路上の白線や消失点研究でよく利用される印象があります．
      </Text>
      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
        ハフ変換とは
      </Text>
      <Text mb={4}>
        ハフ変換(Hough
        Transform)は、画像処理やコンピュータビジョンにおいて、特定の形状（主に直線や円）を検出するための手法です。この変換は、エッジ検出の後に画像内の幾何学的形状を効果的に特定するために使用されます。
      </Text>
      <div>
        <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
          <li>基本概念</li>
        </Text>
        <Text>
          ハフ変換は、画像上のピクセルから形状のパラメータ空間に変換することで、その形状を検出します。例えば、直線や円のような形状をエッジ検出した後に特定する場合に使われます。
        </Text>
      </div>
      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
        <li>直線におけるハフ変換</li>
      </Text>
      <Text>
        直線は、次のような一般的な方程式で表されます：
        <br />
        <code>y = ax + b</code>
        <br />
        ここで、a は傾き、b
        は切片です。しかし、ハフ変換ではこの直線の方程式を次のように極座標系に変換します：
        <br />
        <code>r = x * cos(θ) + y * sin(θ)</code>
        <br />
        ここで、r は直線と原点との垂直距離、θ
        は直線の角度です。この変換により、直線のパラメータ空間（r と
        θ）に変換できます。
      </Text>
      <br />
      <Box>
        <Text mb={2}>しきい値(ハフ空間投票数の最低値)を指定:</Text>
        <NumberInput
          value={threshold}
          onChange={handleThresholdChange}
          min={1}
          max={999}
          size="sm"
          width="100px"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={handleProcessImage} mt={3}>
          {processTrigger ? "元画像に戻す" : "ハフ変換する"}
        </Button>
        <HoughTransform
          imageFile={AbemaBag}
          processTrigger={processTrigger}
          threshold={threshold}
        />
      </Box>
      <br />
      <Text>
        変換結果を確認すると，しきい値を上げるほど検出した直線の数が少なくなることがわかります．これは，より直線らしい直線を限定していった結果です．
        <br />
        画像はカメラで撮影される場合がほとんどであるため，
        <strong>レンズの歪みによる影響</strong>
        を少なからず受けます．人間の視覚には直線に見えても．コンピュータの目線からは直線ではない，と判定されることは往々にしてあります．そのため，検出したい直線をどのように限定していくか，という処理も検討する必要があります．
      </Text>
      <Text>
        <strong>課題</strong>
        <br />
        <li>
          ハフ変換のアルゴリズムを調査し，内部の処理を順に追ってまとめなさい．
        </li>
        <li>
          佐治研究室が直線検出を活用してどのような検出を行なっているかを論文から1つ調査し，まとめなさい．
        </li>
        <li>直線検出を活用できそうな研究テーマを1つ考えなさい．</li>
        <strong>応用課題</strong>
        <li>ハフ変換アルゴリズムをプログラムで作成しなさい．</li>
      </Text>
    </Box>
  );
};
export default Method4;
