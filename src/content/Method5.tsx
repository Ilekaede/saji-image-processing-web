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
} from "@chakra-ui/react";
import Blur from "../components/methodDetail/Blur";
import Median from "../components/methodDetail/Median";
import Lenna from "../components/image/lenna.bmp";
import { setRef } from "@mui/material";

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
    <div>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        ノイズ除去とは？
      </Text>
      <Text mt={3}>
        画像処理における<strong>ノイズ除去</strong>
        （デノイジング）は、画像に含まれる不要なノイズ（ランダムな輝度や色の変動）を取り除き、画像の品質を向上させるプロセスです。ノイズは撮影環境やセンサーの特性、圧縮など様々な要因で発生します。ノイズ除去は、画像解析やコンピュータビジョンの前処理として非常に重要です。
      </Text>

      <Text as="h1" fontSize="xl" fontWeight="bold" fontFamily="Arial" mt={3}>
        <li>ノイズ除去の手法</li>
      </Text>
      <Text>
        ノイズ除去にはさまざまな手法があります。このページでは，2つの代表的なフィルタを紹介し，その違いを考えていきます。
      </Text>

      <Text fontWeight="bold">1. 空間領域フィルタリング</Text>
      <ul>
        <li>
          <br />
          <strong>1. 平均フィルタ（Mean Filter）</strong>:
          各ピクセルの値を周囲のピクセルの平均値で置き換えます。
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
        </li>
        <li>
          <br />
          <strong>2．中央値フィルタ（Median Filter）</strong>:
          各ピクセルの値を周囲のピクセルの中央値で置き換えます。
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
        </li>
        <li>
          <strong>3. ガウシアンフィルタ（Gaussian Filter）</strong>:
          ピクセル値をガウス関数に基づく重み付け平均で置き換えます。
          <ul>
            <li>
              <strong>利点</strong>:
              ノイズを滑らかに除去しつつ、エッジを比較的保持。
            </li>
            <li>
              <strong>欠点</strong>: 計算コストが高く、エッジが若干ぼやける。
            </li>
          </ul>
        </li>
      </ul>

      <h3>2. 周波数領域フィルタリング</h3>
      <p>
        <strong>周波数領域フィルタリング</strong>
        は、画像を周波数成分に分解し、特定の周波数帯域を操作する方法です。
      </p>
      <ul>
        <li>
          <strong>フーリエ変換を用いたフィルタリング</strong>:
          画像をフーリエ変換して周波数領域に移し、ノイズに対応する高周波成分を抑制します。
          <ul>
            <li>
              <strong>利点</strong>: 特定のノイズ周波数を効果的に除去可能。
            </li>
            <li>
              <strong>欠点</strong>: エッジの処理が難しく、計算コストが高い。
            </li>
          </ul>
        </li>
      </ul>

      <h3>3. ウェーブレット変換</h3>
      <p>
        <strong>ウェーブレット変換</strong>
        は、画像を異なるスケールや位置で分解し、ノイズ除去に適用する方法です。
      </p>
      <ul>
        <li>
          <strong>ウェーブレットデノイジング</strong>:
          画像をウェーブレット変換し、ノイズを含む高周波成分を抑制または除去します。
          <ul>
            <li>
              <strong>利点</strong>:
              マルチスケール解析が可能で、エッジや細部を保持しやすい。
            </li>
            <li>
              <strong>欠点</strong>:
              ウェーブレット選択や閾値設定が難しい場合がある。
            </li>
          </ul>
        </li>
      </ul>

      <h3>4. 非局所的手法</h3>
      <p>
        <strong>非局所的手法</strong>
        は、画像内の類似したパッチ（小領域）を利用してノイズを除去します。
      </p>
      <ul>
        <li>
          <strong>非局所平均（Non-Local Means）</strong>:
          画像全体から類似したパッチを探し、それらの平均を用いてノイズを除去します。
          <ul>
            <li>
              <strong>利点</strong>:
              テクスチャや細部を良好に保持しつつノイズ除去が可能。
            </li>
            <li>
              <strong>欠点</strong>: 計算コストが非常に高い。
            </li>
          </ul>
        </li>
        <li>
          <strong>ブロックマッチングと3Dフィルタリング（BM3D）</strong>:
          類似するパッチをグループ化し、3次元変換を行ってノイズを除去します。
          <ul>
            <li>
              <strong>利点</strong>: 高いノイズ除去性能と詳細保持。
            </li>
            <li>
              <strong>欠点</strong>: 実装が複雑で計算コストが高い。
            </li>
          </ul>
        </li>
      </ul>

      <h3>5. 拡散ベースの手法</h3>
      <p>
        <strong>拡散ベースの手法</strong>
        は、画像内の情報の伝播を制御してノイズを除去します。
      </p>
      <ul>
        <li>
          <strong>線形拡散（リニア拡散）</strong>:
          ピクセル値を周囲と均等に平均化します。
          <ul>
            <li>
              <strong>利点</strong>: 実装が簡単。
            </li>
            <li>
              <strong>欠点</strong>: エッジがぼやけやすい。
            </li>
          </ul>
        </li>
        <li>
          <strong>非線形拡散（アニソトロピック拡散）</strong>:
          エッジを保護しながらノイズを除去します。代表的なものにカーマー（Perona-Malik）拡散があります。
          <ul>
            <li>
              <strong>利点</strong>: エッジを保持しつつノイズ除去が可能。
            </li>
            <li>
              <strong>欠点</strong>: パラメータ設定が難しい。
            </li>
          </ul>
        </li>
      </ul>

      <h3>6. バイラテラルフィルタ</h3>
      <p>
        <strong>バイラテラルフィルタ</strong>
        は、空間的な近さとピクセル値の類似性を考慮してノイズを除去します。
      </p>
      <ul>
        <li>
          <strong>利点</strong>: エッジを保持しつつノイズを効果的に除去。
        </li>
        <li>
          <strong>欠点</strong>: 計算コストが高い場合がある。
        </li>
      </ul>

      <h3>7. ディープラーニングベースの手法</h3>
      <p>
        近年、<strong>ディープラーニング</strong>
        を用いたノイズ除去手法が注目されています。
      </p>
      <ul>
        <li>
          <strong>
            畳み込みニューラルネットワーク（CNN）を用いたデノイジング
          </strong>
          :
          CNNを訓練し、ノイズのある画像からノイズを除去したクリアな画像を生成します。
          <ul>
            <li>
              <strong>利点</strong>:
              高精度なノイズ除去が可能で、複雑なノイズにも対応。
            </li>
            <li>
              <strong>欠点</strong>: 大量の訓練データと計算リソースが必要。
            </li>
          </ul>
        </li>
        <li>
          <strong>自動エンコーダ（Autoencoder）</strong>:
          入力画像を圧縮し再構成する過程でノイズを除去します。
          <ul>
            <li>
              <strong>利点</strong>: 効果的な特徴抽出とノイズ除去。
            </li>
            <li>
              <strong>欠点</strong>: モデルの設計と訓練が必要。
            </li>
          </ul>
        </li>
      </ul>

      <h2>まとめ</h2>
      <p>
        画像処理におけるノイズ除去は、さまざまな手法が存在し、それぞれに特徴と利点・欠点があります。選択する手法は、ノイズの種類や画像の用途、計算リソースなどによって異なります。以下に主な手法をまとめます。
      </p>
      <ul>
        <li>
          <strong>空間領域フィルタリング</strong>:
          シンプルで計算が速いが、エッジがぼやける可能性あり。
        </li>
        <li>
          <strong>周波数領域フィルタリング</strong>:
          特定の周波数ノイズに効果的だが、計算コストが高い。
        </li>
        <li>
          <strong>ウェーブレット変換</strong>:
          マルチスケール解析が可能でエッジ保持に優れる。
        </li>
        <li>
          <strong>非局所的手法</strong>:
          高精度なノイズ除去が可能だが計算コストが高い。
        </li>
        <li>
          <strong>拡散ベースの手法</strong>:
          エッジを保持しつつノイズ除去が可能。
        </li>
        <li>
          <strong>バイラテラルフィルタ</strong>:
          エッジを保持しながらノイズ除去。
        </li>
        <li>
          <strong>ディープラーニングベースの手法</strong>:
          高精度だが、大量のデータと計算リソースが必要。
        </li>
      </ul>
      <p>
        用途や環境に応じて最適なノイズ除去手法を選択し、画像の品質向上を図りましょう。
      </p>
    </div>
  );
};
export default Method5;
