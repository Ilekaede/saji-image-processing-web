// Method 12: 時系列フィルタ（ベイジアン・カルマン）
import React from "react";
import {
    Box,
    Text,
    Heading,
    List,
    ListItem,
    UnorderedList,
    OrderedList,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Katexのスタイルをインポート（必要に応じて）

const Method12 = () => {
    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Heading as="h1" size="xl" mb={6}>
                時系列フィルタ（状態推定）
            </Heading>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                画像処理やロボティクスにおいて、カメラやセンサから得られるデータには常に<strong>ノイズ</strong>が含まれています。
                また、対象物が隠れて見えなくなる（オクルージョン）こともあります。
                このような不確実な状況下で、対象物の真の位置や速度（状態）を推定するために用いられるのが<strong>ベイジアンフィルタ</strong>や<strong>カルマンフィルタ</strong>です。
            </Text>

            <Heading as="h2" size="lg" mt={8} mb={4}>
                なぜ「確率」で考えるのか？
            </Heading>
            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                「ボールは座標(100, 200)にある」と断定するのではなく、「座標(100, 200)にある確率が一番高いが、(101, 200)かもしれない」というように、
                状態を<strong>確率分布</strong>として扱います。これにより、センサの誤差や予測の曖昧さを数学的に統合することができます。
            </Text>

            <Heading as="h2" size="lg" mt={8} mb={4}>
                ベイジアンフィルタの仕組み
            </Heading>
            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                時系列フィルタは、主に「<strong>予測（Prediction）</strong>」と「<strong>更新（Update）</strong>」の2つのステップを繰り返します。
                これをベイズの定理を用いて定式化したものがベイジアンフィルタです。
            </Text>

            <Box p={4} bg="gray.50" borderRadius="md" mb={6}>
                <OrderedList spacing={3}>
                    <ListItem>
                        <strong>予測ステップ（運動モデル）:</strong>
                        <br />
                        「1秒前にここにいたなら、今の速度なら1秒後はこの辺りにいるはず」という予測を行います。
                        <br />
                        <Text fontSize="sm" color="gray.600" mt={1}>
                            確率分布は時間の経過とともに広がります（不確実性が増す）。
                        </Text>
                        <BlockMath math="P(x_t | z_{1:t-1}) = \int P(x_t | x_{t-1}) P(x_{t-1} | z_{1:t-1}) dx_{t-1}" />
                    </ListItem>
                    <ListItem>
                        <strong>更新ステップ（観測モデル）:</strong>
                        <br />
                        「センサで観測したらここに見えた」という情報を使って、予測を修正します。
                        <br />
                        <Text fontSize="sm" color="gray.600" mt={1}>
                            不確実性が減少（確率分布のピークが鋭くなる）します。
                        </Text>
                        <BlockMath math="P(x_t | z_{1:t}) \propto P(z_t | x_t) P(x_t | z_{1:t-1})" />
                    </ListItem>
                </OrderedList>
            </Box>

            <Heading as="h2" size="lg" mt={8} mb={4}>
                カルマンフィルタ（Kalman Filter）
            </Heading>
            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                ベイジアンフィルタの最も代表的かつ実用的なアルゴリズムです。以下の強い仮定を置くことで、計算を非常に高速に行うことができます。
            </Text>
            <UnorderedList spacing={2} pl={4} mb={6}>
                <ListItem>システムが<strong>線形</strong>である（行列の掛け算で表せる）</ListItem>
                <ListItem>ノイズが<strong>ガウス分布（正規分布）</strong>に従う</ListItem>
            </UnorderedList>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                ガウス分布は「平均（<InlineMath math="\mu" />）」と「分散（<InlineMath math="\Sigma" />）」の2つのパラメータだけで表現できるため、
                複雑な積分計算が不要になり、行列演算だけで状態を更新できます。
            </Text>

            <Box p={4} borderWidth="1px" borderRadius="md" mb={6}>
                <Text fontWeight="bold" mb={2}>カルマンゲイン（<InlineMath math="K" />）の魔法</Text>
                <Text fontSize="md" lineHeight="1.8">
                    カルマンフィルタの核心は「予測をどれくらい信じるか」と「観測をどれくらい信じるか」の重み付けを自動調整する<strong>カルマンゲイン</strong>にあります。
                    <br />
                    <UnorderedList mt={2}>
                        <ListItem>センサのノイズが少ない → 観測を重視（<InlineMath math="K" />が大）</ListItem>
                        <ListItem>センサのノイズが大きい → 予測を重視（<InlineMath math="K" />が小）</ListItem>
                    </UnorderedList>
                    これを毎時刻、分散行列の計算に基づいて最適に決定します。
                </Text>
            </Box>

            <Heading as="h2" size="lg" mt={8} mb={4}>
                パーティクルフィルタ（Particle Filter）
            </Heading>
            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                カルマンフィルタは「線形・ガウス」という制約がありましたが、現実世界は非線形で非ガウスな分布（例：壁にぶつかる、分かれ道で確率が2つに割れるなど）が多く存在します。
                <br />
                そこで、確率分布を数式ではなく、<strong>大量の粒子（パーティクル）</strong>の集まりで近似する方法がパーティクルフィルタです。
                計算コストは高いですが、どんな複雑な分布も表現できる強力な手法です。
            </Text>

            <TableContainer mb={8}>
                <Table variant="striped" colorScheme="blue">
                    <Thead>
                        <Tr>
                            <Th>手法</Th>
                            <Th>特徴</Th>
                            <Th>メリット</Th>
                            <Th>デメリット</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td><strong>カルマンフィルタ</strong></Td>
                            <Td>線形・ガウス分布</Td>
                            <Td>計算が極めて高速・最適解</Td>
                            <Td>非線形システムに弱い</Td>
                        </Tr>
                        <Tr>
                            <Td><strong>拡張カルマン(EKF)</strong></Td>
                            <Td>線形近似を利用</Td>
                            <Td>ある程度の非線形に対応可</Td>
                            <Td>計算が複雑・発散の恐れ</Td>
                        </Tr>
                        <Tr>
                            <Td><strong>パーティクルフィルタ</strong></Td>
                            <Td>モンテカルロ近似</Td>
                            <Td>どんな分布も表現可能</Td>
                            <Td>計算コストが高い（粒子の数に依存）</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <Heading as="h2" size="lg" mt={8} mb={4}>
                課題
            </Heading>
            <List spacing={3} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    1次元の等速直線運動をする物体に対し、ノイズが乗った観測値から真の位置を推定するカルマンフィルタをPythonで実装しなさい。
                </ListItem>
                <ListItem>
                    OpenCVの `cv2.KalmanFilter` を使用して、マウスカーソルの動きを追跡（スムージング）するプログラムを作成しなさい。
                </ListItem>
                <ListItem>
                    <strong>応用課題:</strong> 動画内の物体追跡（トラッキング）において、対象が一時的に遮蔽物（オクルージョン）に隠れた際、カルマンフィルタの「予測」がどのように役立つか考察しなさい。
                </ListItem>
            </List>
        </Box>
    );
};

export default Method12;
