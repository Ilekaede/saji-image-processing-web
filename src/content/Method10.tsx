// Transformerについて

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
    id: 10,
    title: "Transformer",
    overview: "Attention機構とVision Transformerによる画像処理を学ぶ",
    tags: ["画像処理", "深層学習", "Transformer"],
    searchableContent: "Transformer ViT Vision Transformer Attention Self-Attention SWIN CLIP マルチモーダル DeiT",
};

const Method10 = () => {
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
                Transformerは、元々自然言語処理のために開発されたアーキテクチャですが、近年画像処理分野でも大きな成功を収めています。Attention機構により、画像全体の文脈を効率的に捉えることができ、CNNとは異なるアプローチで高い性能を発揮します。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                Transformerとは
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                Transformerは2017年にGoogleが発表した「Attention is All You Need」論文で提案されたモデルです。従来のRNN（Recurrent Neural Network）やLSTMとは異なり、再帰構造を持たず、Attention機構のみで構成されています。これにより、並列処理が可能になり、長距離依存関係の学習が容易になりました。
            </Text>

            <Text
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily="Arial"
                mt={8}
                mb={4}
            >
                Self-Attention機構
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                Self-Attentionは、入力シーケンス内の各要素が他のすべての要素とどれだけ関連しているかを計算する機構です。画像の場合、各パッチが他のパッチとの関係性を学習します。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Query、Key、Valueの計算
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        入力<InlineMath math="X" />から、Query（<InlineMath math="Q" />）、Key（<InlineMath math="K" />）、Value（<InlineMath math="V" />）を線形変換で生成します。
                    </Text>
                    <Box mb={4}>
                        <BlockMath math="Q = XW_Q, \quad K = XW_K, \quad V = XW_V" />
                    </Box>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Attention重みの計算
                    </Text>
                    <Text fontSize="md" lineHeight="1.8" mb={2}>
                        QueryとKeyの内積を取り、スケーリングとソフトマックスを適用してAttention重みを計算します。
                    </Text>
                    <Box mb={4}>
                        <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
                    </Box>
                    <Text fontSize="md" lineHeight="1.8">
                        ここで、<InlineMath math="d_k" />はKeyの次元数です。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Multi-Head Attention
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        複数のAttentionヘッドを並列に実行し、異なる表現部分空間の情報を捉えます。これにより、モデルの表現力が向上します。
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
                Vision Transformer (ViT)の登場
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                2020年にGoogleが発表したVision Transformer (ViT)は、画像をパッチに分割し、それらを系列データとして扱うことで、Transformerを画像認識に適用しました。大規模データセットで学習させることで、CNNと同等以上の性能を達成しました。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        画像のパッチ化
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        入力画像を固定サイズのパッチ（例：16×16ピクセル）に分割します。224×224の画像なら、14×14=196個のパッチになります。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        線形埋め込み
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        各パッチを平坦化し、線形変換で固定次元のベクトルに変換します。これが自然言語処理における単語埋め込みに相当します。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        位置エンコーディング
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        パッチの位置情報を保持するため、位置エンコーディングを追加します。これにより、パッチ間の空間的関係を学習できます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Transformer Encoder
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        パッチ埋め込みをTransformer Encoderに入力し、Self-Attentionで全体の文脈を捉えます。
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
                CNNとTransformerの違い
            </Text>

            <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
                <Heading size="md" mb={4}>
                    CNN vs Transformer
                </Heading>
                <TableContainer>
                    <Table variant="striped" colorScheme="purple">
                        <Thead>
                            <Tr>
                                <Th>特徴</Th>
                                <Th>CNN</Th>
                                <Th>Transformer</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">帰納的バイアス</Td>
                                <Td>局所性と平行移動不変性を仮定</Td>
                                <Td>最小限のバイアス、データから学習</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">受容野</Td>
                                <Td>層を重ねて徐々に拡大</Td>
                                <Td>最初から画像全体を参照可能</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">計算量</Td>
                                <Td>画像サイズに対して線形</Td>
                                <Td>パッチ数の2乗に比例</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">データ効率</Td>
                                <Td>少ないデータでも学習可能</Td>
                                <Td>大規模データが必要</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">解釈性</Td>
                                <Td>フィルターの可視化が容易</Td>
                                <Td>Attention mapで関係性を可視化</Td>
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
                代表的なVision Transformerモデル
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        ViT (Vision Transformer) - 2020
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        最初のVision Transformer。JFT-300Mという大規模データセットで事前学習することで、ImageNetでCNNを上回る性能を達成しました。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        DeiT (Data-efficient image Transformers) - 2021
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        知識蒸留を用いることで、ImageNetのみでの学習でも高い性能を実現しました。大規模データセットなしでもTransformerを効果的に学習できることを示しました。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Swin Transformer - 2021
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        階層的な構造とシフトウィンドウ機構を導入し、計算効率を大幅に改善しました。物体検出やセグメンテーションなど、様々なタスクで優れた性能を発揮します。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        BEiT (BERT Pre-Training of Image Transformers) - 2021
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        自然言語処理のBERTにヒントを得た自己教師あり学習手法を画像に適用しました。
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
                マルチモーダル学習
            </Text>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
                Transformerの強みは、異なるモダリティ（画像とテキストなど）を統一的に扱えることです。これにより、画像とテキストを同時に理解するマルチモーダルモデルが登場しました。
            </Text>

            <List spacing={4} styleType="decimal" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        CLIP (Contrastive Language-Image Pre-training) - 2021
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        OpenAIが開発したモデルで、画像とテキストを同じ埋め込み空間にマッピングします。テキストによるゼロショット画像分類が可能です。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        BLIP (Bootstrapping Language-Image Pre-training) - 2022
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        画像キャプション生成とVQA（Visual Question Answering）の両方に対応したマルチモーダルモデルです。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Flamingo - 2022
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        DeepMindが開発した大規模マルチモーダルモデルで、少数の例から新しいタスクを学習できます。
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
                以下は、事前学習済みViTを使った画像分類の簡単な例です。
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
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image

# モデルとプロセッサの読み込み
processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')

# 画像の読み込みと前処理
image = Image.open('image.jpg')
inputs = processor(images=image, return_tensors="pt")

# 推論
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax(-1).item()

print(f"Predicted class: {model.config.id2label[predicted_class]}")`}
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
                        画像生成（DALL-E、Stable Diffusion）
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        テキストから画像を生成するモデルで、Transformerベースのアーキテクチャが使われています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        画像検索
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        CLIPなどのマルチモーダルモデルを使い、テキストクエリで画像を検索できます。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        医療画像解析
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        病変の検出や分類において、CNNと組み合わせることで高い精度を達成しています。
                    </Text>
                </ListItem>

                <ListItem>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        自動運転
                    </Text>
                    <Text fontSize="md" lineHeight="1.8">
                        周囲環境の理解において、長距離の文脈を捉えるTransformerの特性が活かされています。
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
                Transformerの課題と今後の展望
            </Text>

            <List spacing={3} styleType="disc" pl={4} mb={8}>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>計算コスト:</strong> Self-Attentionの計算量がパッチ数の2乗に比例するため、高解像度画像では計算コストが大きい
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>データ要求量:</strong> 大規模データセットでの事前学習が必要（DeiTなどで改善）
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>効率化:</strong> Swin Transformerなどの階層的アーキテクチャで改善が進行中
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <strong>CNNとのハイブリッド:</strong> 両者の長所を組み合わせたモデルの研究が活発
                    </Text>
                </ListItem>
            </List>

            <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={8}>
                Transformerは画像処理分野で急速に発展しており、今後もCNNと並ぶ、あるいはそれを超える重要なアーキテクチャとして進化していくと考えられます。特にマルチモーダル学習の分野では、Transformerの統一的なアーキテクチャが大きな強みとなっています。
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
                        Vaswani, A., et al. (2017). "Attention is All You Need." NeurIPS.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Dosovitskiy, A., et al. (2020). "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale." ICLR 2021.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Touvron, H., et al. (2021). "Training data-efficient image transformers & distillation through attention." ICML.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Liu, Z., et al. (2021). "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows." ICCV.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Radford, A., et al. (2021). "Learning Transferable Visual Models From Natural Language Supervision." ICML.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        Li, J., et al. (2022). "BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation." ICML.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <ChakraLink href="https://huggingface.co/docs/transformers/model_doc/vit" isExternal color="blue.500">
                            Hugging Face - Vision Transformer Documentation
                        </ChakraLink>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text fontSize="md" lineHeight="1.8">
                        <ChakraLink href="https://paperswithcode.com/method/vision-transformer" isExternal color="blue.500">
                            Papers with Code - Vision Transformer
                        </ChakraLink>
                    </Text>
                </ListItem>
            </List>
        </Box>
    );
};

export default Method10;
