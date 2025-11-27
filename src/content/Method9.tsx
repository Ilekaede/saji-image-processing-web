// 画像認識(CNN)について

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
    Heading,
    Link as ChakraLink,
    Code,
} from "@chakra-ui/react";
import { InlineMath, BlockMath } from "react-katex";

// メタデータの定義
export const methodMetadata = {
    id: 9,
    title: "画像認識(CNN)",
    overview: "畳み込みニューラルネットワークによる画像認識の基礎を学ぶ",
    tags: ["画像処理", "深層学習", "CNN"],
    searchableContent: "CNN 畳み込み 画像認識 ResNet VGG AlexNet 転移学習 データ拡張 classification convolutional neural network",
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
                CNN（Convolutional Neural Network：畳み込みニューラルネットワーク）は、画像認識において最も成功した深層学習アーキテクチャです。画像の空間的な特徴を効率的に学習できる構造を持ち、画像分類、物体検出、セグメンテーションなど、様々なタスクで高い性能を発揮します。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                画像認識とは
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                画像認識（Image Classification）は、入力画像が何を表しているかを判定するタスクです。例えば、画像が「猫」「犬」「車」のどれであるかを分類します。物体検出とは異なり、画像全体に対して1つのラベルを予測します。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                CNNの基本構造
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                CNNは主に以下の3種類の層から構成されます。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        畳み込み層（Convolution Layer）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        画像の局所的な特徴を抽出する層です。フィルター（カーネル）を画像上でスライドさせながら畳み込み演算を行います。
                    </Text>
                    <Box mb={4}>
                        <BlockMath math="Y_{i,j} = \sum_{m}\sum_{n} X_{i+m,j+n} \cdot W_{m,n} + b" />
                    </Box>
                    <Text fontSize="md" lineHeight="1.8">
                        ここで、<InlineMath math="X" />は入力画像、<InlineMath math="W" />はフィルター、<InlineMath math="b" />はバイアスです。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        プーリング層（Pooling Layer）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        特徴マップのサイズを縮小し、計算量を削減するとともに、位置のずれに対する頑健性を高めます。代表的な手法にMax PoolingとAverage Poolingがあります。
                    </Text>
                    <List spacing={2} styleType="disc" pl={6}>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                <strong>Max Pooling:</strong> 領域内の最大値を選択
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text fontSize="md" lineHeight="1.8">
                                <strong>Average Pooling:</strong> 領域内の平均値を計算
                            </Text>
                        </ListItem>
                    </List>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        全結合層（Fully Connected Layer）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        抽出された特徴を基に最終的な分類を行う層です。通常、CNNの最後に配置され、各クラスの確率を出力します。
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
                代表的なCNNアーキテクチャ
            </Text>

            <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
                <Heading size="md" mb={4}>
                    CNNの進化
                </Heading>
                <TableContainer>
                    <Table variant="striped" colorScheme="teal">
                        <Thead>
                            <Tr>
                                <Th>モデル</Th>
                                <Th>年</Th>
                                <Th>特徴</Th>
                                <Th>層数</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">LeNet-5</Td>
                                <Td>1998</Td>
                                <Td>最初期のCNN。手書き数字認識に使用</Td>
                                <Td>7層</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">AlexNet</Td>
                                <Td>2012</Td>
                                <Td>ImageNetで圧勝。深層学習ブームの火付け役</Td>
                                <Td>8層</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">VGG</Td>
                                <Td>2014</Td>
                                <Td>3×3の小さなフィルターを多層に重ねる</Td>
                                <Td>16-19層</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">GoogLeNet</Td>
                                <Td>2014</Td>
                                <Td>Inceptionモジュールで効率的に特徴抽出</Td>
                                <Td>22層</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">ResNet</Td>
                                <Td>2015</Td>
                                <Td>残差接続で超深層ネットワークを実現</Td>
                                <Td>50-152層</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">EfficientNet</Td>
                                <Td>2019</Td>
                                <Td>幅・深さ・解像度を最適にスケーリング</Td>
                                <Td>可変</Td>
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
                重要な技術革新
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        AlexNet (2012) - 深層学習の幕開け
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        ImageNet Large Scale Visual Recognition Challenge (ILSVRC) 2012で、従来手法を大きく上回る精度を達成しました。ReLU活性化関数、Dropout、データ拡張などの技術を導入し、深層学習の有効性を実証しました。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        VGG (2014) - シンプルで深いネットワーク
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        3×3の小さなフィルターを繰り返し使用することで、深いネットワークを構築しました。シンプルな構造ながら高い性能を発揮し、転移学習の基盤モデルとして広く使われています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ResNet (2015) - 残差学習の導入
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        残差接続（Skip Connection）を導入することで、勾配消失問題を解決し、100層を超える超深層ネットワークの学習を可能にしました。
                    </Text>
                    <Box mb={4}>
                        <BlockMath math="y = F(x) + x" />
                    </Box>
                    <Text fontSize="md" lineHeight="1.8">
                        この式で、<InlineMath math="F(x)" />は残差関数、<InlineMath math="x" />は入力です。ネットワークは差分（残差）を学習するため、学習が容易になります。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        EfficientNet (2019) - 効率的なスケーリング
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        ネットワークの幅、深さ、入力解像度を同時に最適化する複合スケーリング手法を提案しました。少ないパラメータで高い精度を達成し、実用性が高いモデルです。
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
                転移学習（Transfer Learning）
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                転移学習は、大規模データセット（ImageNetなど）で事前学習したモデルを、別のタスクに適用する手法です。少ないデータでも高い精度を達成できるため、実用上非常に重要です。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        特徴抽出（Feature Extraction）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        事前学習モデルの畳み込み層を固定し、最後の全結合層のみを新しいタスク用に学習します。データが少ない場合に有効です。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ファインチューニング（Fine-tuning）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        事前学習モデル全体を新しいタスクで再学習します。データが十分にある場合、より高い精度が期待できます。
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
                データ拡張（Data Augmentation）
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                データ拡張は、既存の訓練データに変換を加えて人工的にデータを増やす手法です。過学習を防ぎ、モデルの汎化性能を向上させます。
            </Text>

            <List spacing={3} styleType="disc" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>幾何学的変換:</strong> 回転、反転、拡大縮小、平行移動
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>色変換:</strong> 明るさ調整、コントラスト変更、色相変換
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>ノイズ追加:</strong> ガウシアンノイズ、ソルト&ペッパーノイズ
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>Cutout/Mixup:</strong> 画像の一部を隠す、複数画像を混合
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
                実装例（PyTorch）
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={4}>
                以下は、事前学習済みResNetを使った転移学習の簡単な例です。
            </Text>

            <Box
                as="pre"
                p={4}
                bg="gray.50"
                borderRadius="md"
                overflowX="auto"
                mb={8}
                fontSize="sm"
            >
                <Code display="block" whiteSpace="pre">
                    {`import torch
import torchvision.models as models
import torch.nn as nn

# 事前学習済みResNet18を読み込み
model = models.resnet18(pretrained=True)

# 最後の全結合層を置き換え（10クラス分類の場合）
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)

# 損失関数と最適化手法
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# 学習ループ
for epoch in range(num_epochs):
    for images, labels in train_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()`}
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
                実際の応用例
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        医療画像診断
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        X線、CT、MRI画像から病変を検出・分類します。皮膚がんの診断では、専門医と同等以上の精度を達成した例もあります。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        顔認証システム
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        スマートフォンのロック解除、入退室管理、決済システムなどで広く使われています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        農業
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        作物の病害虫検出、成熟度判定、雑草識別などに活用されています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        製造業
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        製品の外観検査、欠陥分類、品質管理の自動化に貢献しています。
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
                CNNの課題と今後の展望
            </Text>

            <List spacing={3} styleType="disc" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>計算コスト:</strong> 大規模モデルの学習には膨大な計算資源が必要
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>解釈性:</strong> なぜその判断をしたのかの説明が困難（ブラックボックス問題）
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>データ依存性:</strong> 大量のラベル付きデータが必要
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>敵対的攻撃への脆弱性:</strong> 微小なノイズで誤分類される可能性
                    </Text>
                </ListItem>
            </List>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={8}>
                これらの課題に対して、軽量化技術（量子化、枝刈り）、説明可能AI（XAI）、自己教師あり学習、敵対的学習などの研究が進められています。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                参考文献
            </Text>

            <List spacing={3} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        LeCun, Y., et al. (1998). "Gradient-based learning applied to document recognition." Proceedings of the IEEE.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Krizhevsky, A., et al. (2012). "ImageNet Classification with Deep Convolutional Neural Networks." NeurIPS.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Simonyan, K., & Zisserman, A. (2014). "Very Deep Convolutional Networks for Large-Scale Image Recognition." ICLR.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        He, K., et al. (2016). "Deep Residual Learning for Image Recognition." CVPR.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Tan, M., & Le, Q. (2019). "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks." ICML.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <ChakraLink href="https://pytorch.org/vision/stable/models.html" isExternal color="blue.500">
                            PyTorch Vision Models Documentation
                        </ChakraLink>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <ChakraLink href="https://cs231n.github.io/" isExternal color="blue.500">
                            Stanford CS231n: Convolutional Neural Networks for Visual Recognition
                        </ChakraLink>
                    </Text>
                </ListItem>
            </List>
        </Box>
    );
};

export default Method9;
