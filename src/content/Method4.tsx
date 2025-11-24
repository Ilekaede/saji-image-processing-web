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
  List,
  ListItem,
  Image,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import HoughTransform from "../components/methodDetail/HoughTransform";
import AbemaBag from "../components/image/abemaBag.jpg";
import { InlineMath, BlockMath } from "react-katex";
// メタデータの定義
export const methodMetadata = {
  id: 4,
  title: "ハフ変換",
  overview: "ハフ変換とは〜",
  tags: ["画像処理", "ハフ変換"],
  image: AbemaBag,
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
            src={AbemaBag}
            alt="ハフ変換の例画像"
            maxH="300px"
            maxW="300px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        本稿では主に直線検出のために利用する画像処理で、
        <strong>ハフ変換</strong>
        を取り上げます。佐治研では道路上の白線や消失点研究でよく利用される印象があります。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        ハフ変換とは
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        ハフ変換(Hough
        Transform)は、画像処理やコンピュータビジョンにおいて、特定の形状（主に直線や円）を検出するための手法です。この変換は、エッジ検出の後に画像内の幾何学的形状を効果的に特定するために使用されます。
      </Text>

      <List spacing={4} styleType="decimal" pl={4} mb={6}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            基本概念
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            ハフ変換は、画像上のピクセルから形状のパラメータ空間に変換することで、その形状を検出します。例えば、直線や円のような形状をエッジ検出した後に特定する場合に使われます。
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            直線におけるハフ変換
          </Text>
          <Box fontSize="md" lineHeight="1.8">
            直線は、次のような一般的な方程式で表されます：
            <br />
            <BlockMath math={"y = ax + b"} />
            <br />
            ここで、
            <InlineMath math="a" /> は傾き、
            <InlineMath math="b" />
            は切片です。しかし、ハフ変換ではこの直線の方程式を次のように極座標系に変換します：
            <br />
            <BlockMath math={"r = x \\cos\\theta + y \\sin\\theta"} />
            <br />
            ここで、
            <InlineMath math="r" /> は直線と原点との垂直距離、
            <InlineMath math={"\\theta"} />
            は直線の角度です。この変換により、直線のパラメータ空間（
            <InlineMath math="r" /> と
            <InlineMath math={"\\theta"} />
            ）に変換できます。
          </Box>
        </ListItem>
      </List>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
        <Text mb={2}>しきい値(ハフ空間投票数の最低値)を指定:</Text>
        <Flex align="center" gap={4} mb={4}>
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
          <Button onClick={handleProcessImage}>
            {processTrigger ? "元画像に戻す" : "ハフ変換する"}
          </Button>
        </Flex>
        <HoughTransform
          imageFile={AbemaBag}
          processTrigger={processTrigger}
          threshold={threshold}
        />
      </Box>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        変換結果を確認すると、しきい値を上げるほど検出した直線の数が少なくなることがわかります。これは、より直線らしい直線を限定していった結果です。
        画像はカメラで撮影される場合がほとんどであるため、
        <strong>レンズの歪みによる影響</strong>
        を少なからず受けます。人間の視覚には直線に見えても、コンピュータの目線からは直線ではない、と判定されることは往々にしてあります。そのため、検出したい直線をどのように限定していくか、という処理も検討する必要があります。
      </Text>

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
          ハフ変換のアルゴリズムを調査し，内部の処理を順に追ってまとめなさい．
        </ListItem>
        <ListItem>
          佐治研究室が直線検出を活用してどのような検出を行なっているかを論文から1つ調査し，まとめなさい．
        </ListItem>
        <ListItem>直線検出を活用できそうな研究テーマを1つ考えなさい．</ListItem>
        <ListItem>
          <strong>応用課題</strong>
          ：ハフ変換アルゴリズムをプログラムで作成しなさい．
        </ListItem>
      </List>
    </Box>
  );
};
export default Method4;
