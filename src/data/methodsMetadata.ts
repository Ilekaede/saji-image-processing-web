import { MethodContent } from "../types/method";

// 画像インポート
import abemaBagThreshold from "../components/image/abemaBag_threshold.jpg";
import deepLearning from "../components/image/deepLearning.png";
import abemaBag from "../components/image/abemaBag.jpg";
import lenna from "../components/image/lenna.bmp";
import pythonPC from "../components/image/python_in_pc.png";
import templateMatchingImg from "../components/image/template_matching.png";

/**
 * 全Methodのメタデータを集約
 * このファイルにより、methodUtilsでのrequireを排除し、Tree Shakingを有効化
 */
export const methodsMetadata: MethodContent[] = [
  {
    id: 1,
    title: "2値化",
    overview: "",
    tags: ["画像処理", "2値化"],
    image: abemaBagThreshold,
    searchableContent:
      "2値化 閾値 グレースケール 白黒 画像処理 二値化 threshold binary モノクロ 画素値 輝度 変換",
  },
  {
    id: 2,
    title: "背景差分法",
    overview:
      "動画から背景情報のみを取り出してみる。固定カメラ案件での活躍が期待できる。",
    tags: ["画像処理", "背景差分法"],
    searchableContent:
      "背景差分法 動体検出 フレーム差分 移動物体 検出 background subtraction 動画処理 時系列 変化検出",
  },
  {
    id: 3,
    title: "物体検出",
    overview: "画像内の物体を検出し、位置と種類を特定する技術について学ぶ",
    tags: ["画像処理", "深層学習", "物体検出"],
    image: deepLearning,
    searchableContent:
      "物体検出 YOLO R-CNN Faster R-CNN SSD RetinaNet IoU mAP bounding box アンカーボックス object detection",
  },
  {
    id: 4,
    title: "ハフ変換",
    overview: "ハフ変換とは〜",
    tags: ["画像処理", "ハフ変換"],
    image: abemaBag,
    searchableContent:
      "ハフ変換 直線検出 円検出 Hough transform エッジ検出 形状検出 パラメータ空間 投票",
  },
  {
    id: 5,
    title: "ノイズ除去を除去したい -フィルタ編-",
    overview: "なかなか注目がいかないノイズ除去について述べる．実はかなり重要",
    tags: ["画像処理", "ノイズ"],
    image: lenna,
    searchableContent:
      "ノイズ除去 フィルタ ガウシアンフィルタ メディアンフィルタ 平滑化 smoothing デノイジング ぼかし blur",
  },
  {
    id: 6,
    title: "特徴点マッチング",
    overview: "特徴点マッチングを使ってみよう",
    tags: ["画像処理", "特徴点マッチング"],
    searchableContent:
      "特徴点マッチング SIFT SURF ORB 特徴量 キーポイント 対応点 feature matching descriptor",
  },
  {
    id: 7,
    title: "ループ書くときはNumPyを使おう",
    overview:
      "Pythonの画像処理って速度遅いな〜二重ループなんてやってられないよ;;と思っているそこのあなた向け",
    tags: ["画像処理", "NumPy"],
    image: pythonPC,
    searchableContent:
      "NumPy Python 配列 ベクトル化 高速化 行列演算 ndarray ループ最適化 パフォーマンス",
  },
  {
    id: 8,
    title: "オプティカルフロー",
    overview:
      "動画内の物体の動きをベクトル場として可視化し、密と疎の2つのアプローチを学ぶ",
    tags: ["画像処理", "オプティカルフロー", "動き推定"],
    searchableContent:
      "オプティカルフロー optical flow 動き検出 Farneback Lucas-Kanade 密 疎 ベクトル場 動き推定 フロー 特徴点追跡 動画処理 モーション",
  },
  {
    id: 9,
    title: "画像認識(CNN)",
    overview: "畳み込みニューラルネットワークによる画像認識の基礎を学ぶ",
    tags: ["画像処理", "深層学習", "CNN"],
    searchableContent:
      "CNN 畳み込み 画像認識 ResNet VGG AlexNet 転移学習 データ拡張 classification convolutional neural network",
  },
  {
    id: 10,
    title: "Transformer",
    overview: "Attention機構とVision Transformerによる画像処理を学ぶ",
    tags: ["画像処理", "深層学習", "Transformer"],
    searchableContent:
      "Transformer ViT Vision Transformer Attention Self-Attention SWIN CLIP マルチモーダル DeiT",
  },
  {
    id: 11,
    title: "テンプレートマッチング",
    overview:
      "画像内から特定のパターンを探し出すテンプレートマッチングの原理と実装を学ぶ",
    tags: ["画像処理", "テンプレートマッチング", "物体検出", "パターン認識"],
    image: templateMatchingImg,
    searchableContent:
      "テンプレートマッチング Template Matching SSD NCC ZNCC 類似度 物体検出 OpenCV パターン認識 相関",
  },
  {
    id: 12,
    title: "時系列フィルタ（状態推定）",
    overview:
      "不確実な観測値から真の状態を推定する。カルマンフィルタやパーティクルフィルタの基礎。",
    tags: ["画像処理", "時系列解析", "状態推定", "カルマンフィルタ"],
    image: deepLearning,
    searchableContent:
      "カルマンフィルタ ベイジアンフィルタ パーティクルフィルタ 状態推定 予測 更新 観測モデル 運動モデル 確率分布 ガウス分布",
  },
  {
    id: 13,
    title: "ベイジアンフィルタで物体を追跡する",
    overview:
      "確率分布で不確かさを扱い、オクルージョンやノイズに強い物体追跡を実装する。パーティクルフィルタを中心に実装上のハマりどころを解説。",
    tags: [
      "画像処理",
      "物体追跡",
      "ベイジアンフィルタ",
      "パーティクルフィルタ",
    ],
    searchableContent:
      "ベイジアンフィルタ パーティクルフィルタ 物体追跡 particle filter 粒子 縮退 リサンプリング オクルージョン 尤度関数 状態推定 確率分布 tracking",
  },
  {
    id: 14,
    title: "差分法で動体を検出する",
    overview:
      "フレーム間差分法・MOG2・奥行き方向の検出問題など、実装時に詰まりやすい課題と対処法をまとめる。",
    tags: ["画像処理", "動体検出", "背景差分法", "MOG2"],
    searchableContent:
      "差分法 フレーム間差分 背景差分 MOG2 動体検出 moving object detection background subtraction ゴースト 照明変化 影 オプティカルフロー 奥行き 接近 varThreshold learningRate",
  },
  {
    id: 15,
    title: "射影変換で空撮映像を直下視点に変換する",
    overview:
      "ドローンの斜め空撮映像を鳥瞰図に変換する。動画に適用したときのドリフト・揺れ・平面仮定の破綻など、実運用で詰まる課題と対処法をまとめる。",
    tags: ["画像処理", "射影変換", "ホモグラフィ", "空撮映像"],
    searchableContent:
      "射影変換 ホモグラフィ homography perspective transform 鳥瞰図 直下視点 ドローン 空撮 warpPerspective findHomography getPerspectiveTransform RANSAC ドリフト 平面仮定 対応点 速度計測 定点観察",
  },
];
