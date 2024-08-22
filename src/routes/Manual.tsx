import { Box, Text } from "@chakra-ui/react";
const Manual = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        学んでおきたい基礎知識
      </Text>
      <Text fontSize="xl" fontFamily="Verdana" fontWeight="bold">
        画像処理とは
      </Text>
      <Text>
        画像処理とは，すごく大雑把に言うと「画素値，画像内の画素位置，画素数等，画像をデータとして利用しいじっていく分野」である．
        <br />
        佐治先生の「パターン認識」を履修済ならば，この言い方は大体理解できるだろう．例えば，顔特徴の講義では顔面を表す領域の円形度，領域の画素数から画像内の顔面の位置を検出した．これは画像を画素量・領域特徴計算値の2パラメータに分解する処理で，画像から情報を取り出した結果である．人間は無意識下でこれらの計算を行い，画像から情報を読み取ることができる．要は，この無意識下の計算をコンピュータに書き起こそう，というのが本研究室の方針である．
        <br />
        <br />
      </Text>
      <Text fontSize="xl" fontFamily="Verdana" fontWeight="bold">
        デジタル画像とは
      </Text>
      <Text>
        デジタル画像とは，二次元に配列された格子点の集まりを指す．この格子点を画素(Pixel,ピクセル)と呼ぶ．
        <br />
      </Text>
    </Box>
  );
};
export default Manual;
