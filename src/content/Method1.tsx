// 二値化について

import React from "react";
import { Box, Text } from "@chakra-ui/react";
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
    </Box>
  );
};

export default Method1;
