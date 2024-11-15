// 二値化について

import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import abemaBagThreshold from "../components/image/abemaBag_threshold.jpg";
const Method1 = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        2値化
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        2 値化は画像処理の基礎的な手法で、画像を黒と白の 2
        色に分けます。特定の閾値を設定し、それに基づいて各ピクセルの色を決定します。
      </Text>
      <Text>
        画素値というよりは数値に対して使用する印象があり，単に色彩だけでなく，輝度や明度，時には標高データに使用することもあります．
      </Text>
      <Text>
        例えば，Rチャンネルでの閾値，Gチャンネルの閾値，Bチャンネルの閾値を設定することで2値化を複数チャンネルに対して行うことができます．しかし，その分条件は細かく設定する(マジックナンバーが多い状態)必要があるため，汎用性は落ちます．また，組み合わせ等の検討も必要であるため，現実的ではないと言わざるを得ません．
      </Text>
      <Text>2値化の閾値決定アルゴリズムについて</Text>
      <li>判別分析法</li>
      <Text>
        大津の2値化とも呼ばれ，ヒストグラムのクラス間分散が最大となる値を閾値として決定するアルゴリズムです．流れは以下の通り
        ．
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
