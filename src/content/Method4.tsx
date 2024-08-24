// ハフ変換について

import { Text } from "@chakra-ui/react";

import React from "react";

const Method4 = () => {
  return (
    <div>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        ハフ変換を理解する
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
      <Text>
        <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
          <li>基本概念</li>
        </Text>
        <Text>
          ハフ変換は、画像上のピクセルから形状のパラメータ空間に変換することで、その形状を検出します。例えば、直線や円のような形状をエッジ検出した後に特定する場合に使われます。
        </Text>
      </Text>
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
    </div>
  );
};
export default Method4;
