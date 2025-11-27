// オプティカルフローについて

import React from "react";
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    List,
    ListItem,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { InlineMath, BlockMath } from "react-katex";

// メタデータの定義
export const methodMetadata = {
    id: 8,
    title: "オプティカルフロー",
    overview:
        "動画内の物体の動きをベクトル場として可視化し、密と疎の2つのアプローチを学ぶ",
    tags: ["画像処理", "オプティカルフロー", "動き推定"],
    searchableContent:
        "オプティカルフロー optical flow 動き検出 Farneback Lucas-Kanade 密 疎 ベクトル場 動き推定 フロー 特徴点追跡 動画処理 モーション",
};

const Method9 = () => {
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
                オプティカルフロー（Optical
                Flow）は、動画内の各ピクセルまたは特徴点の動きをベクトル場として表現する技術です。連続するフレーム間での物体の移動を検出し、動きの方向と速度を可視化することで、動画解析の基礎となります。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                オプティカルフローとは
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                オプティカルフローは、時刻
                <InlineMath math="t" />と時刻
                <InlineMath math="t+1" />
                の2つのフレーム間で、各ピクセルがどの方向にどれだけ移動したかを表すベクトル場です。このベクトル場を解析することで、以下のような応用が可能になります：
            </Text>

            <List spacing={3} styleType="disc" pl={6} mb={6}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>物体追跡</strong> - 動画内の特定物体の動きを追跡
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>動き検出</strong> - 監視カメラでの異常検知
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>動画安定化</strong> - 手ぶれ補正
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>3D復元</strong> - カメラの動きから3次元構造を推定
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>行動認識</strong> - 人の動作パターンの解析
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
                密なフローと疎なフロー
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                オプティカルフローには、大きく分けて2つのアプローチがあります：
            </Text>

            <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
                <Heading size="md" mb={4}>
                    密なフロー vs 疎なフロー
                </Heading>
                <TableContainer>
                    <Table variant="striped" colorScheme="blue">
                        <Thead>
                            <Tr>
                                <Th>特徴</Th>
                                <Th>密なフロー（Dense）</Th>
                                <Th>疎なフロー（Sparse）</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">計算対象</Td>
                                <Td>全ピクセル</Td>
                                <Td>特徴点のみ</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">代表的手法</Td>
                                <Td>Farneback法</Td>
                                <Td>Lucas-Kanade法</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">計算コスト</Td>
                                <Td>高い</Td>
                                <Td>低い</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">情報量</Td>
                                <Td>全体の動きを詳細に把握</Td>
                                <Td>重要な点の動きのみ</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">用途</Td>
                                <Td>動き解析、セグメンテーション</Td>
                                <Td>物体追跡、カメラ推定</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                Farneback法（密なオプティカルフロー）
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                Farneback法は、画像全体のピクセルに対してオプティカルフローを計算する手法です。各ピクセルの近傍を2次多項式で近似し、その係数から動きベクトルを推定します。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={6}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        多項式展開
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        各ピクセルの近傍を2次多項式で近似します。これにより、局所的な画像構造を数学的に表現できます。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ピラミッド処理
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        画像を複数のスケールで処理することで、大きな動きにも対応できます。粗いスケールから細かいスケールへと段階的に推定を行います。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        HSVカラーマップでの可視化
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        動きの方向を色相（Hue）、速度を明度（Value）で表現することで、直感的に理解できる可視化が可能です。
                    </Text>
                </ListItem>
            </List>

            <VStack spacing={4} mt={6} mb={8}>
                <Text fontSize="lg" fontWeight="bold">
                    Farneback法による密なオプティカルフロー
                </Text>
                <Box
                    as="video"
                    controls
                    width="100%"
                    maxW="800px"
                    height="auto"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <source
                        src={`${process.env.PUBLIC_URL}/videos/optical_flow_farneback.webm`}
                        type="video/webm"
                    />
                    お使いのブラウザは動画の再生に対応していません。
                </Box>
                <Text fontSize="md" color="gray.600">
                    左：元映像　右：Farneback法による密なフロー可視化
                </Text>
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                    色が動きの方向を、明るさが速度を表しています
                </Text>
            </VStack>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                Lucas-Kanade法（疎なオプティカルフロー）
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                Lucas-Kanade法は、画像内の特徴的な点（コーナーなど）のみを追跡する手法です。Shi-Tomasiのコーナー検出で特徴点を抽出し、それらの点の動きを追跡します。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={6}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        特徴点検出（Shi-Tomasi法）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        画像内で追跡に適した特徴点（コーナー）を自動的に検出します。これらの点は、周囲と明確に区別できる特徴を持っています。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        局所的な動き推定
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        各特徴点の小さな近傍領域で、以下の仮定に基づいて動きを推定します：
                    </Text>
                    <List spacing={2} styleType="circle" pl={6} mt={2}>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                <strong>輝度一定性</strong>: 物体の輝度は時間変化しない
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                <strong>空間一貫性</strong>: 近傍のピクセルは同じ動きをする
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                <strong>時間連続性</strong>: 動きは滑らかに変化する
                            </Text>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        軌跡の可視化
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        各特徴点の移動経路を線で表示することで、物体の動きを直感的に理解できます。
                    </Text>
                </ListItem>
            </List>

            <VStack spacing={4} mt={6} mb={8}>
                <Text fontSize="lg" fontWeight="bold">
                    Lucas-Kanade法による疎なオプティカルフロー
                </Text>
                <Box
                    as="video"
                    controls
                    width="100%"
                    maxW="800px"
                    height="auto"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <source
                        src={`${process.env.PUBLIC_URL}/videos/optical_flow_lucas_kanade.webm`}
                        type="video/webm"
                    />
                    お使いのブラウザは動画の再生に対応していません。
                </Box>
                <Text fontSize="md" color="gray.600">
                    左：元映像　右：Lucas-Kanade法による特徴点追跡
                </Text>
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                    カラフルな線が各特徴点の軌跡を表しています
                </Text>
            </VStack>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                オプティカルフローの数学的背景
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                オプティカルフローの基本的な仮定は、<strong>輝度一定性</strong>
                です。時刻<InlineMath math="t" />での位置
                <InlineMath math="(x, y)" />のピクセルが、時刻
                <InlineMath math="t+1" />で位置
                <InlineMath math="(x+dx, y+dy)" />
                に移動したとき、その輝度は変化しないと仮定します：
            </Text>

            <Box mb={6}>
                <BlockMath math="I(x, y, t) = I(x+dx, y+dy, t+1)" />
            </Box>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                これをテイラー展開すると、以下の<strong>オプティカルフロー方程式</strong>
                が得られます：
            </Text>

            <Box mb={6}>
                <BlockMath math="\frac{\partial I}{\partial x}u + \frac{\partial I}{\partial y}v + \frac{\partial I}{\partial t} = 0" />
            </Box>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                ここで、<InlineMath math="u = dx/dt" />と
                <InlineMath math="v = dy/dt" />
                は動きベクトルの成分です。この方程式は1つの式に2つの未知数があるため、そのままでは解けません（
                <strong>開口問題</strong>
                ）。そこで、追加の制約条件を導入することで解を求めます。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                実世界での応用例
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        自動運転
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        周囲の車両や歩行者の動きを検出し、衝突回避や経路計画に活用されます。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        スポーツ分析
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        選手の動きを追跡し、フォーム分析やパフォーマンス評価に利用されます。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        医療画像診断
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        心臓の動きや血流の解析など、動的な生体情報の可視化に使用されます。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ロボットビジョン
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        ロボットが環境内の物体の動きを認識し、適切に反応するために利用されます。
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
                課題
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Farneback法とLucas-Kanade法の動画を見比べて、それぞれの特徴と違いをまとめなさい。特に、どのような場面でどちらの手法が適しているか考察してください。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        オプティカルフローの基本仮定である「輝度一定性」が成り立たない状況を3つ挙げ、それぞれの場合にどのような問題が発生するか説明しなさい。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        実際に動画を用意し、OpenCVを使ってオプティカルフローを計算するプログラムを作成しなさい。パラメータを変更して、結果がどのように変化するか実験してください。
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>応用課題</strong>
                        ：オプティカルフローを利用して、動画内の特定の物体を自動的に追跡するプログラムを作成しなさい。背景差分法と組み合わせることで、より高精度な追跡が可能になります。
                    </Text>
                </ListItem>
            </List>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                オプティカルフローは、動画解析の基礎となる重要な技術です。密なフローと疎なフローの特性を理解し、目的に応じて適切な手法を選択できるようになりましょう。
            </Text>
        </Box>
    );
};

export default Method9;
