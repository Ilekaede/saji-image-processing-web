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
  searchableContent: "ハフ変換 直線検出 円検出 Hough transform エッジ検出 形状検出 パラメータ空間 投票",
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
            基本概念と全体フロー
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={3}>
            ハフ変換は、画像上のピクセルから形状のパラメータ空間に変換することで、その形状を検出します。例えば、直線や円のような形状をエッジ検出した後に特定する場合に使われます。
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={2}>
            <strong>処理の流れ：</strong>
          </Text>
          <List spacing={2} styleType="none" pl={4}>
            <ListItem>1. <strong>前処理</strong>：グレースケール変換、ノイズ除去</ListItem>
            <ListItem>2. <strong>エッジ検出</strong>：Cannyなどのエッジ検出アルゴリズムを適用</ListItem>
            <ListItem>3. <strong>ハフ変換</strong>：エッジ点をパラメータ空間に投票</ListItem>
            <ListItem>4. <strong>直線検出</strong>：投票数が多いパラメータを特定</ListItem>
            <ListItem>5. <strong>結果描画</strong>：検出された直線を元画像に描画</ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            直線におけるハフ変換と極座標表現
          </Text>
          <Box fontSize="md" lineHeight="1.8">
            直線は、次のような一般的な方程式で表されます：
            <br />
            <BlockMath math={"y = ax + b"} />
            <br />
            ここで、
            <InlineMath math="a" /> は傾き、
            <InlineMath math="b" />
            は切片です。しかし、この表現には<strong>垂直線（傾きが無限大）を表現できない</strong>という問題があります。
            <br />
            <br />
            そのため、ハフ変換ではこの直線の方程式を次のように<strong>極座標系</strong>に変換します：
            <br />
            <BlockMath math={"r = x \\cos\\theta + y \\sin\\theta"} />
            <br />
            ここで、
            <InlineMath math="r" /> は直線と原点との垂直距離、
            <InlineMath math={"\\theta"} />
            は直線の法線ベクトルの角度です。
            <br />
            <br />
            <strong>極座標表現の利点：</strong>
            <List spacing={1} styleType="disc" pl={6} mt={2}>
              <ListItem>垂直線も含めてすべての直線を表現可能</ListItem>
              <ListItem>
                パラメータ空間が有限（<InlineMath math="0 < θ < 180°" />、<InlineMath math="r" />は画像サイズで制限）
              </ListItem>
              <ListItem>計算が安定（無限大の値を扱わない）</ListItem>
            </List>
          </Box>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            投票メカニズムとアキュムレータ配列
          </Text>
          <Box fontSize="md" lineHeight="1.8">
            ハフ変換の核心は<strong>投票（Voting）</strong>という仕組みです。
            <br />
            <br />
            <strong>アキュムレータ配列：</strong>
            <br />
            <InlineMath math="r" />-<InlineMath math="\theta" />
            空間を離散化した2次元配列で、各セルが「その直線パラメータに投票された回数」を保持します。
            <br />
            <br />
            <strong>投票プロセス：</strong>
            <List spacing={2} styleType="none" pl={4} mt={2}>
              <ListItem>
                1. エッジ点 <InlineMath math="(x, y)" /> を検出
              </ListItem>
              <ListItem>
                2. <InlineMath math="\theta" /> を 0° 〜 180° まで一定間隔で変化させる
              </ListItem>
              <ListItem>
                3. 各 <InlineMath math="\theta" /> に対して <InlineMath math="r = x \cos\theta + y \sin\theta" /> を計算
              </ListItem>
              <ListItem>
                4. 計算された <InlineMath math="(r, \theta)" /> に対応するアキュムレータのセルに投票（+1）
              </ListItem>
              <ListItem>
                5. すべてのエッジ点で繰り返し
              </ListItem>
            </List>
            <br />
            <strong>直線検出：</strong>
            <br />
            アキュムレータで投票数が閾値を超えたセルを探します。そのセルの
            <InlineMath math="(r, \theta)" />
            が検出された直線のパラメータとなります。同一直線上にある複数のエッジ点は、パラメータ空間で同じ
            <InlineMath math="(r, \theta)" />
            に投票するため、その位置の投票数が高くなります。
          </Box>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            アルゴリズムの詳細手順
          </Text>
          <Box fontSize="md" lineHeight="1.8">
            <List spacing={3} styleType="none" pl={0}>
              <ListItem>
                <strong>ステップ1: 前処理</strong>
                <br />
                グレースケール変換、ガウシアンフィルタによるノイズ除去を行います。
              </ListItem>
              <ListItem>
                <strong>ステップ2: エッジ検出</strong>
                <br />
                Cannyエッジ検出などを用いて、画像内のエッジ点を抽出します。
              </ListItem>
              <ListItem>
                <strong>ステップ3: アキュムレータ初期化</strong>
                <br />
                <InlineMath math="r" />-<InlineMath math="\theta" />
                空間の2次元配列を0で初期化します。配列のサイズは、
                <InlineMath math="\theta" />の分解能と画像サイズによって決まります。
              </ListItem>
              <ListItem>
                <strong>ステップ4: 投票</strong>
                <br />
                各エッジ点について、可能なすべての
                <InlineMath math="(r, \theta)" />
                の組み合わせに投票します。
              </ListItem>
              <ListItem>
                <strong>ステップ5: ピーク検出</strong>
                <br />
                アキュムレータから閾値以上の投票を持つセルを検出します。これが検出された直線のパラメータです。
              </ListItem>
              <ListItem>
                <strong>ステップ6: 直線描画</strong>
                <br />
                検出された
                <InlineMath math="(r, \theta)" />
                パラメータから、元画像上に直線を描画します。
              </ListItem>
            </List>
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
        変換結果を確認すると、<strong>しきい値を上げるほど検出した直線の数が少なくなる</strong>ことがわかります。
        しきい値は、アキュムレータ配列における<strong>最低投票数</strong>を意味します。
        つまり、しきい値を上げることで、より多くのエッジ点が支持する（より確からしい）直線のみを検出するようになります。
        <br />
        <br />
        画像はカメラで撮影される場合がほとんどであるため、
        <strong>レンズの歪みによる影響</strong>
        を少なからず受けます。人間の視覚には直線に見えても、コンピュータの目線からは直線ではない、と判定されることは往々にしてあります。
        また、ノイズや不完全なエッジによって誤検出が発生することもあります。
        そのため、しきい値の調整や後処理によって、検出したい直線をどのように限定していくか、という処理も検討する必要があります。
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
