// オプティカルフローについて

import React from "react";
import {
    Box,
    Text,
    List,
    ListItem,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
} from "@chakra-ui/react";
import { InlineMath, BlockMath } from "react-katex";

// メタデータの定義
export const methodMetadata = {
    id: 8,
    title: "オプティカルフロー",
    overview: "動画像内のピクセルの動きを推定する基本技術",
    tags: ["画像処理", "動画像処理", "オプティカルフロー"],
    // image: opticalFlowImage, // TODO: Add image
};

const Method8 = () => {
    const comparisonData = [
        {
            feature: "計算範囲",
            lucasKanade: "特徴点のみ（疎）",
            farneback: "全ピクセル（密）",
        },
        {
            feature: "計算速度",
            lucasKanade: "高速",
            farneback: "低速",
        },
        {
            feature: "精度",
            lucasKanade: "特徴点で高精度",
            farneback: "全体的に滑らか",
        },
        {
            feature: "用途",
            lucasKanade: "物体追跡、特徴点追跡",
            farneback: "動き解析、ビデオ安定化",
        },
    ];

    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "flex-start" }}
                gap={6}
                mb={8}
            >
                <Text
                    as="h1"
                    fontSize="3xl"
                    fontWeight="bold"
                    fontFamily="Arial"
                    mb={4}
                >
                    {methodMetadata.title}
                </Text>
            </Flex>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                オプティカルフロー（Optical Flow）は、動画像処理における基本的な技術の一つで、連続するフレーム間でのピクセルの動きを推定する手法です。
                カメラや物体の動きによって生じる画像上の見かけの動きを、ベクトル場として表現します。
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
                オプティカルフローは、時刻<InlineMath math="t" />における画像上の点
                <InlineMath math="(x, y)" />が、時刻<InlineMath math="t + \Delta t" />
                においてどこに移動したかを示す変位ベクトル
                <InlineMath math="(u, v)" />
                として表現されます。このベクトル場を求めることで、画像内の動きを定量的に解析できます。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                数学的基礎
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={6}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        輝度一定性の仮定
                    </Text>
                    <Box fontSize="md" lineHeight="1.8">
                        オプティカルフローの計算では、物体が移動しても輝度値は変化しないという仮定を置きます：
                        <BlockMath math="I(x, y, t) = I(x + u, y + v, t + \Delta t)" />
                        ここで、<InlineMath math="I(x, y, t)" />
                        は時刻<InlineMath math="t" />における座標
                        <InlineMath math="(x, y)" />の輝度値です。
                    </Box>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        オプティカルフロー方程式
                    </Text>
                    <Box fontSize="md" lineHeight="1.8">
                        上記の仮定をテイラー展開し、1次の項まで考慮すると、以下の式が得られます：
                        <BlockMath math="I_x u + I_y v + I_t = 0" />
                        ここで、<InlineMath math="I_x, I_y" />は空間微分、
                        <InlineMath math="I_t" />
                        は時間微分を表します。この式は1つの方程式に対して2つの未知数
                        <InlineMath math="(u, v)" />
                        があるため、単独では解けません。これを
                        <strong>アパーチャ問題</strong>と呼びます。
                    </Box>
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
                オプティカルフローの種類
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        疎なオプティカルフロー（Sparse Optical Flow）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        画像内の特徴点（コーナーやエッジなど）のみでフローを計算します。
                        代表的な手法として<strong>Lucas-Kanade法</strong>
                        があります。計算コストが低く、リアルタイム処理に適しています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        密なオプティカルフロー（Dense Optical Flow）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        画像内の全ピクセルでフローを計算します。代表的な手法として
                        <strong>Farneback法</strong>
                        があります。全体的な動きを詳細に把握できますが、計算コストが高くなります。
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
                代表的なアルゴリズム
            </Text>

            <List spacing={6} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Lucas-Kanade法
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        局所的な領域（ウィンドウ）内では動きが一定であると仮定し、最小二乗法によってフローを推定します。
                    </Text>
                    <Text fontSize="md" fontWeight="bold" mb={1}>
                        特徴：
                    </Text>
                    <List spacing={2} styleType="disc" pl={6}>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                特徴点の追跡に適している
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                計算が高速で、リアルタイム処理が可能
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                小さな動きに対して有効
                            </Text>
                        </ListItem>
                    </List>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Farneback法
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        画像を多項式で近似し、その係数を用いて密なフローを計算します。
                    </Text>
                    <Text fontSize="md" fontWeight="bold" mb={1}>
                        特徴：
                    </Text>
                    <List spacing={2} styleType="disc" pl={6}>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                全ピクセルでフローを計算
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                滑らかなフロー場が得られる
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                動きの可視化や解析に適している
                            </Text>
                        </ListItem>
                    </List>
                </ListItem>
            </List>

            <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
                <Heading size="md" mb={4}>
                    Lucas-Kanade法 vs Farneback法
                </Heading>
                <TableContainer>
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>特徴</Th>
                                <Th>Lucas-Kanade法</Th>
                                <Th>Farneback法</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {comparisonData.map((row) => (
                                <Tr key={row.feature}>
                                    <Td fontWeight="bold">{row.feature}</Td>
                                    <Td>{row.lucasKanade}</Td>
                                    <Td>{row.farneback}</Td>
                                </Tr>
                            ))}
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
                応用例
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        物体追跡
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        動画内の物体を追跡する際に、オプティカルフローを用いて物体の移動方向と速度を推定します。
                        特徴点ベースの追跡では、Lucas-Kanade法がよく使用されます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        動き検出
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        フローベクトルの大きさを閾値処理することで、動いている領域を検出できます。
                        監視カメラでの異常検知などに応用されます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ビデオ安定化
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        カメラの手ブレによる動きをオプティカルフローで推定し、補正することで、安定した映像を得ることができます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        交通流解析
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        道路上の車両の動きをオプティカルフローで解析し、交通量や渋滞の検出に利用します。
                        佐治研究室では、ドライブレコーダー映像や定点カメラ映像を用いた交通流解析にオプティカルフローが活用されています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        行動認識
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        人間の動作パターンをオプティカルフローで捉え、行動認識や異常行動検知に応用します。
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
            <List spacing={3} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    Lucas-Kanade法とFarneback法の違いを理解し、それぞれの利点と欠点をまとめなさい。
                </ListItem>
                <ListItem>
                    オプティカルフローの計算において、輝度一定性の仮定が成り立たない場合を考え、その対処法を調べなさい。
                </ListItem>
                <ListItem>
                    実際の動画に対してオプティカルフローを計算し、その結果を可視化してみなさい。
                    OpenCVのcalcOpticalFlowPyrLK（Lucas-Kanade）やcalcOpticalFlowFarneback関数を使用すると良い。
                </ListItem>
                <ListItem>
                    <strong>応用課題</strong>
                    ：オプティカルフローを用いて、動画内の動いている物体を検出するプログラムを作成しなさい。
                </ListItem>
            </List>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                オプティカルフローは、動画像処理の基礎となる重要な技術です。
                特に、物体追跡や動き解析など、時系列データを扱う研究において欠かせない手法となっています。
                実際に手を動かして実装することで、理解を深めましょう。
            </Text>
        </Box>
    );
};

export default Method8;
