// テンプレートマッチングについて

import React from "react";
import {
    Box,
    Text,
    List,
    ListItem,
    Heading,
    Code,
    VStack,
} from "@chakra-ui/react";
import { InlineMath, BlockMath } from "react-katex";
import templateMatchingImg from "../components/image/template_matching.png";

// メタデータの定義
export const methodMetadata = {
    id: 11,
    title: "テンプレートマッチング",
    overview: "画像内から特定のパターンを探し出すテンプレートマッチングの原理と実装を学ぶ",
    tags: ["画像処理", "テンプレートマッチング", "物体検出", "パターン認識"],
    image: templateMatchingImg,
    searchableContent:
        "テンプレートマッチング Template Matching SSD NCC ZNCC 類似度 物体検出 OpenCV パターン認識 相関",
};

const Method11 = () => {
    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Text
                as="h1"
                fontSize="3xl"
                fontWeight="bold"
                fontFamily="Arial"
                mb={4}
            >
                {methodMetadata.title}
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                テンプレートマッチング（Template Matching）は、入力画像全体の中から、あらかじめ用意した「テンプレート画像」（探したいパターン）と最も似ている場所を探し出す、最も基本的な物体検出手法の一つです。「ウォーリーを探せ」のように、大きな画像の中から小さな画像を探す処理をイメージすると分かりやすいでしょう。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                テンプレートマッチングの原理
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                処理の原理は非常にシンプルです。テンプレート画像を入力画像の上で少しずつずらしながらスライドさせ、各位置で「テンプレート画像」と「入力画像の重なっている部分」の類似度を計算します。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        テンプレート画像を、入力画像の左上に配置します。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        その位置での「類似度」を計算し、結果画像（スコアマップ）画素値として記録します。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        1ピクセル右にずらして同様に計算します。行の端まで来たら、次の行の先頭に移動します。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        画像全体を走査し終えたら、類似度が最も高い（または低い）場所を「見つかった場所」と判定します。
                    </Text>
                </ListItem>
            </List>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                類似度の計算手法
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                「似ている」かどうかを数値化するために、いくつかの計算式が使われます。以下の <InlineMath math="T" /> はテンプレート画像、<InlineMath math="I" /> は入力画像、<InlineMath math="(x,y)" /> は現在の走査位置、<InlineMath math="(x',y')" /> はテンプレート内の座標を表します。
            </Text>

            <Box mb={8}>
                <Heading size="md" mb={4}>
                    SSD (Sum of Squared Differences)
                </Heading>
                <Text fontSize="md" lineHeight="1.8" mb={4}>
                    画素値の差の二乗和です。値が<strong>小さいほど似ている</strong>ことになります。計算が単純で高速ですが、照明の変化（全体の明るさの違いなど）に弱いです。
                </Text>
                <Box mb={4}>
                    <BlockMath math="R(x,y) = \sum_{x',y'} (T(x',y') - I(x+x',y+y'))^2" />
                </Box>
            </Box>

            <Box mb={8}>
                <Heading size="md" mb={4}>
                    NCC (Normalized Cross Correlation)
                </Heading>
                <Text fontSize="md" lineHeight="1.8" mb={4}>
                    正規化相互相関です。ベクトルの内積のような計算を行い、正規化します。値は -1 から 1 の数値をとり、<strong>1に近いほど似ている</strong>ことになります。SSDに比べて計算量は増えますが、照明の変化（明るさの変動）に対して強くなります。
                </Text>
                <Box mb={4}>
                    <BlockMath math="R(x,y) = \frac{\sum_{x',y'} (T(x',y') \cdot I(x+x',y+y'))}{\sqrt{\sum_{x',y'} T(x',y')^2 \cdot \sum_{x',y'} I(x+x',y+y')^2}}" />
                </Box>
                <Text fontSize="md" lineHeight="1.8" mb={4}>
                    さらに平均値を引いてから計算する <strong>ZNCC (Zero-mean Normalized Cross Correlation)</strong> は、さらに照明変化に強固になりますが、計算コストは最も高くなります。
                </Text>
            </Box>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                メリットとデメリット
            </Text>

            <Box p={6} borderWidth="1px" borderRadius="lg" mb={8} bg="gray.50">
                <List spacing={3}>
                    <ListItem>
                        <Text fontWeight="bold" color="green.600">メリット:</Text>
                        <List styleType="circle" pl={6} mt={2}>
                            <ListItem>アルゴリズムが単純で理解しやすい。</ListItem>
                            <ListItem>実装が容易。</ListItem>
                        </List>
                    </ListItem>
                    <ListItem mt={4}>
                        <Text fontWeight="bold" color="red.600">デメリット:</Text>
                        <List styleType="circle" pl={6} mt={2}>
                            <ListItem><strong>回転、スケール変化、変形に弱い。</strong>（テンプレートと全く同じ向き・大きさでないと検出できない）</ListItem>
                            <ListItem>遮蔽（オクルージョン）があるとうまく検出できない。</ListItem>
                            <ListItem>画像サイズが大きいと計算時間がかかる。</ListItem>
                        </List>
                    </ListItem>
                </List>
            </Box>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                実装例 (Python + OpenCV)
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                OpenCVでは <code>cv2.matchTemplate</code> 関数を使って簡単に実装できます。
            </Text>

            <Box
                as="pre"
                p={4}
                bg="gray.800"
                color="white"
                borderRadius="md"
                overflowX="auto"
                mb={8}
                fontSize="sm"
            >
                <Code display="block" whiteSpace="pre" bg="transparent" color="inherit">
                    {`import cv2
import numpy as np

# 画像の読み込み（グレー画像）
img = cv2.imread('input_image.jpg', 0)
template = cv2.imread('template_image.jpg', 0)

# 画像とテンプレートのサイズ取得
h, w = template.shape

# テンプレートマッチングの実行
# cv2.TM_CCOEFF_NORMED は正規化相関係数（ZNCCに近い）を使用
res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)

# 類似度が最大の場所を探す
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
top_left = max_loc
bottom_right = (top_left[0] + w, top_left[1] + h)

# 見つかった場所に矩形を描画
result_img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
cv2.rectangle(result_img, top_left, bottom_right, (0, 0, 255), 2)

# 結果の表示
cv2.imshow('Detected', result_img)
cv2.waitKey(0)
cv2.destroyAllWindows()`}
                </Code>
            </Box>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                動画像処理への応用と工夫
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                静止画だけでなく、Webカメラや動画ファイルに対してテンプレートマッチングを行うことも可能です。ただし、対象物が動いたり姿勢が変わったりするため、いくつかの工夫が必要になります。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        複数フレームによる安定化 (Temporal Consistency)
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        単一のフレームだけで判断すると、ノイズや一時的な遮蔽によって検出位置が大きく飛んでしまうことがあります。これを防ぐために、<strong>「過去数フレームの結果を統合する」</strong>手法が有効です。
                        <br />
                        例えば、最新の3フレームで検出された位置の平均を取ったり、急激な移動（外れ値）を無視したりすることで、プルプルと震えるような誤検出を抑制できます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        テンプレートの動的更新 (Template Update)
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        動画内では、対象物の向きや照明条件が徐々に変化することがあります。最初のフレームで切り出したテンプレートを使い続けると、いずれマッチしなくなります。
                        <br />
                        そこで、<strong>「マッチングに成功したら、その場所の画像を新しいテンプレートとして更新する」</strong>というアプローチがあります。ただし、少しずつズレた画像を更新し続けると、最終的に別の物体を追跡してしまう（ドリフト現象）リスクがあるため、初期テンプレートとの類似度も併用して監視するなどの対策が必要です。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        マルチテンプレート (Multi-Template)
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        対象物が回転したり変形したりすることが予想される場合、あらかじめ<strong>「少しずつ角度や大きさを変えた複数のテンプレート」</strong>を用意しておく手法です。
                        <br />
                        全てのテンプレートでマッチングを行い、最もスコアが高かったものを採用します。計算量は増えますが、ロバスト性（頑健性）は向上します。
                    </Text>
                </ListItem>
            </List>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                実践：動画像でのテンプレートマッチング
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                実際の動画を使って、テンプレートマッチングの作業フローを確認してみましょう。
                以下の動画は、ボールが転がっている様子を撮影したものです。このボールを追跡することを目標にします。
            </Text>

            <VStack spacing={4} mt={6} mb={8}>
                <Box
                    as="video"
                    controls
                    width="100%"
                    maxW="600px"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <source
                        src={`${process.env.PUBLIC_URL}/videos/ball_cutted.mp4`}
                        type="video/mp4"
                    />
                    お使いのブラウザは動画の再生に対応していません。
                </Box>
            </VStack>

            <List spacing={6} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Step 1: テンプレートの切り抜き
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={4}>
                        まず、動画の最初のフレーム（または対象がきれいに写っているフレーム）から、追跡したい対象物を矩形で切り抜いて「テンプレート画像」を作成します。
                        ペイントソフトなどで座標を調べ、その範囲を配列スライスで取得します。
                    </Text>
                    <Box
                        as="pre"
                        p={4}
                        bg="gray.800"
                        color="white"
                        borderRadius="md"
                        fontSize="sm"
                        overflowX="auto"
                    >
                        <Code display="block" whiteSpace="pre" bg="transparent" color="inherit">
                            {`# 最初のフレームを読み込む
ret, frame = cap.read()

# 追跡対象（ボール）の座標を指定 (x, y, w, h)
# ※実際の座標は動画に合わせて調整してください
x, y, w, h = 300, 200, 50, 50

# テンプレート画像の切り出し
template = frame[y:y+h, x:x+w]`}
                        </Code>
                    </Box>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Step 2: マッチング処理の実装
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={4}>
                        動画を1フレームずつ読み込み、各フレームに対してテンプレートマッチングを行います。
                        最も類似度が高い場所 (`max_loc`) を検出し、そこに矩形を描画します。
                    </Text>
                    <Box
                        as="pre"
                        p={4}
                        bg="gray.800"
                        color="white"
                        borderRadius="md"
                        fontSize="sm"
                        overflowX="auto"
                    >
                        <Code display="block" whiteSpace="pre" bg="transparent" color="inherit">
                            {`while True:
    ret, frame = cap.read()
    if not ret: break

    # マッチング実行
    res = cv2.matchTemplate(frame, template, cv2.TM_CCOEFF_NORMED)
    
    # 最大スコアの場所を取得
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    
    # 検出位置
    top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)
    
    # 矩形描画
    cv2.rectangle(frame, top_left, bottom_right, (0, 255, 0), 2)
    
    cv2.imshow('Tracking', frame)
    if cv2.waitKey(30) & 0xFF == 27: break`}
                        </Code>
                    </Box>

                    <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                        このコードを実行した結果、以下のような追跡動画が生成されます。
                        緑色の矩形がマッチングによって検出されたボールの位置を示しています。
                    </Text>

                    <VStack spacing={4} mt={6} mb={8}>
                        <Box
                            as="video"
                            controls
                            width="100%"
                            maxW="600px"
                            borderRadius="lg"
                            boxShadow="lg"
                        >
                            <source
                                src={`${process.env.PUBLIC_URL}/videos/method11_1.mp4`}
                                type="video/mp4"
                            />
                            お使いのブラウザは動画の再生に対応していません。
                        </Box>
                        <Text fontSize="sm" color="gray.500">
                            実行結果: method11_1.mp4
                        </Text>
                    </VStack>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Step 3: 精度向上のための工夫
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={4}>
                        単純なマッチングだけでは、ボールが隠れたり画面外に出たりしたときに誤検出してしまいます。
                        また、ボールの模様が変わると見失う可能性があります。以下の工夫を追加してみましょう。
                    </Text>
                    <List spacing={3} styleType="disc" pl={4}>
                        <ListItem>
                            <Text fontSize="md" fontWeight="bold">類似度の閾値設定</Text>
                            <Text fontSize="md">
                                `max_val` が一定値（例: 0.8）以下なら「見つからなかった」と判断し、矩形を描画しないようにします。
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" fontWeight="bold">テンプレートの動的更新</Text>
                            <Text fontSize="md">
                                高いスコア（例: 0.9以上）で検出できた場合のみ、その切り抜き画像を「新しいテンプレート」として上書き保存します。これにより、徐々に変化する見た目に対応できます。
                            </Text>
                        </ListItem>
                    </List>
                </ListItem>
            </List>

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

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        自分の好きな画像を用意し、その中の一部を切り取って「テンプレート画像」を作成してください。テンプレートマッチングを行い、正しく場所が特定できるか確認しましょう。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        入力画像の明るさを変えたり、テンプレート画像を少し回転させたりして、検出結果がどう変わるか実験してください。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <code>cv2.matchTemplate</code> の第3引数（手法）を <code>cv2.TM_SQDIFF</code> (SSD) に変更し、結果の違いを確認してください。SSDの場合は、最大値ではなく<strong>最小値</strong>の場所が正解になる点に注意しましょう。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        テンプレートマッチングでは課題点として、テンプレート自体の作成が手動であることが挙げられます。座標値での決め打ちや切り抜きソフトの使用はその分手間がかかります。1フレーム目でテンプレートをどのように切り抜くと自動化が可能となるか、考えてください。
                    </Text>
                </ListItem>
            </List>
        </Box>
    );
};

export default Method11;
