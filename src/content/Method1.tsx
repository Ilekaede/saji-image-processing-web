// 二値化について

import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import abemaBagThreshold from "../components/image/abemaBag_threshold.jpg";

// メタデータの定義
export const methodMetadata = {
  id: 1,
  title: "2値化",
  overview:
    "2値化は画像処理の基礎的な手法で，画像を黒と白の2色に分けます．特定の閾値を設定し，それに基づいて各ピクセルの色を決定します．画素値というよりは数値に対して使用する印象があり，単に色彩だけでなく，輝度や明度といった数値データに対して処理することもできます．",
  tags: ["画像処理", "2値化"],
  image: abemaBagThreshold,
};

const Method1 = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        {methodMetadata.title}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        {methodMetadata.overview}
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        例えば，Rチャンネルでの閾値，Gチャンネルの閾値，Bチャンネルの閾値を設定することで2値化を複数チャンネルに対して行うことができます．しかし，その分条件は細かく設定する(マジックナンバーが多い状態)必要があるため，汎用性は落ちます．また，組み合わせ等の検討も必要であるため，現実的ではないと言わざるを得ません．
      </Text>
      <br />
      <Text fontSize="xl" fontWeight="bold" fontFamily="Arial">
        2値化の閾値決定アルゴリズムについて
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        ・判別分析法
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        大津の2値化とも呼ばれ，ヒストグラムのクラス間分散が最大となる値を閾値として決定するアルゴリズムです．以下のような処理を行うことで閾値の最適化が行われます．
      </Text>
      <ol>
        <li>各強度レベルのヒストグラムと確率を計算する．</li>
        <li>
          2つのクラス間分散の確率とクラス分散平均を用いて初期値を決定する．
        </li>
        <li>
          閾値を0から255(画素値の最小から最大)までループし，その中で次のステップを行う．
          <li>分散の確率とクラスの分散平均を更新する．</li>
          <li>クラス分散を計算し，最大であるか比較を行う．</li>
        </li>
      </ol>
      <Image src={abemaBagThreshold} alt="判別分析法結果"></Image>
    </Box>
  );
};

export default Method1;
