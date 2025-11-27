// 物体検出について

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
  Image,
  Flex,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import deepLearing from "../components/image/deepLearning.png";

// メタデータの定義
export const methodMetadata = {
  id: 3,
  title: "物体検出",
  overview: "画像内の物体を検出し、位置と種類を特定する技術について学ぶ",
  tags: ["画像処理", "深層学習", "物体検出"],
  image: deepLearing,
  searchableContent: "物体検出 YOLO R-CNN Faster R-CNN SSD RetinaNet IoU mAP bounding box アンカーボックス object detection",
};

const Method3 = () => {
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
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={deepLearing}
            alt="物体検出のイラスト"
            maxH="300px"
            maxW="300px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        物体検出（Object Detection）は、画像内に存在する物体の位置と種類を同時に特定する技術です。単に「何が写っているか」を判定する画像分類とは異なり、「どこに何があるか」を矩形領域（Bounding Box）で示すことができます。自動運転、監視カメラ、医療画像診断など、様々な分野で活用されています。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        物体検出の基本概念
      </Text>

      <List spacing={4} styleType="decimal" pl={4} mb={6}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Bounding Box（バウンディングボックス）
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            物体を囲む矩形領域のことで、通常は左上の座標(x, y)と幅(w)、高さ(h)で表現されます。物体検出の目的は、この矩形領域と物体のクラスを正確に予測することです。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            IoU（Intersection over Union）
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            予測されたBounding Boxと正解のBounding Boxの重なり具合を示す指標です。2つの領域の積集合を和集合で割った値で、0から1の範囲を取ります。一般的にIoU &gt; 0.5で正解とみなされます。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            mAP（mean Average Precision）
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            物体検出の精度を評価する代表的な指標です。各クラスのAverage Precision（AP）を計算し、その平均を取ります。mAP@0.5やmAP@0.5:0.95など、IoUの閾値によって異なる指標が使われます。
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
        古典的手法から深層学習へ
      </Text>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        深層学習が登場する前は、HOG（Histogram of Oriented Gradients）特徴量とSVM（Support Vector Machine）を組み合わせた手法や、DPM（Deformable Part Models）などが使われていました。これらの手法は手作業で特徴量を設計する必要があり、精度にも限界がありました。
      </Text>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        2012年にAlexNetが画像認識コンペティションで圧倒的な性能を示したことをきっかけに、深層学習による物体検出が急速に発展しました。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        深層学習による物体検出の進化
      </Text>

      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={8}>
        <Heading size="md" mb={4}>
          代表的な物体検出アルゴリズム
        </Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>手法</Th>
                <Th>年</Th>
                <Th>特徴</Th>
                <Th>速度</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">R-CNN</Td>
                <Td>2014</Td>
                <Td>領域提案 + CNN分類。物体検出に深層学習を導入</Td>
                <Td>遅い</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Fast R-CNN</Td>
                <Td>2015</Td>
                <Td>特徴マップの共有により高速化</Td>
                <Td>中程度</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Faster R-CNN</Td>
                <Td>2015</Td>
                <Td>RPN（Region Proposal Network）で領域提案も学習</Td>
                <Td>中程度</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">YOLO</Td>
                <Td>2016</Td>
                <Td>1段階検出。リアルタイム処理が可能</Td>
                <Td>非常に速い</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">SSD</Td>
                <Td>2016</Td>
                <Td>複数スケールの特徴マップで検出</Td>
                <Td>速い</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">RetinaNet</Td>
                <Td>2017</Td>
                <Td>Focal Lossでクラス不均衡に対処</Td>
                <Td>中程度</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">YOLOv8</Td>
                <Td>2023</Td>
                <Td>最新のYOLO。高精度かつ高速</Td>
                <Td>非常に速い</Td>
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
        2段階検出 vs 1段階検出
      </Text>

      <List spacing={4} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            2段階検出（Two-Stage Detection）
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={2}>
            R-CNN系のアルゴリズムが該当します。まず物体が存在しそうな領域を提案し、次にその領域を分類します。
          </Text>
          <List spacing={2} styleType="disc" pl={6}>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                <strong>利点:</strong> 高精度
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                <strong>欠点:</strong> 処理が遅い
              </Text>
            </ListItem>
          </List>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            1段階検出（One-Stage Detection）
          </Text>
          <Text fontSize="md" lineHeight="1.8" mb={2}>
            YOLO、SSDなどが該当します。領域提案と分類を同時に行います。
          </Text>
          <List spacing={2} styleType="disc" pl={6}>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                <strong>利点:</strong> 高速、リアルタイム処理が可能
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="md" lineHeight="1.8">
                <strong>欠点:</strong> 2段階検出に比べて精度がやや劣る（最近は改善）
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
        YOLOによる物体検出のデモ
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        YOLO（You Only Look Once）は、リアルタイム物体検出の代名詞となったアルゴリズムです。画像全体を一度だけ見るだけで物体を検出できることから、この名前が付けられました。
      </Text>


      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        実際にYOLOv8を使って物体検出を行った結果を動画で確認できます。動画内の鳥が検出され、Bounding Boxとクラスラベル、IoUが表示されます。
      </Text>

      <Box mb={8}>
        <Box
          as="video"
          controls
          width="100%"
          maxW="800px"
          height="auto"
          borderRadius="lg"
          boxShadow="lg"
          mx="auto"
          display="block"
        >
          <source src={`${process.env.PUBLIC_URL}/videos/method3_1.webm`} type="video/webm" />
          お使いのブラウザは動画の再生に対応していません。
        </Box>
        <Text fontSize="md" color="gray.600" textAlign="center" mt={2}>
          YOLOv8による物体検出のデモ動画
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
        実際の応用例
      </Text>

      <List spacing={4} styleType="decimal" pl={4} mb={8}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            自動運転
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            歩行者、車両、信号機、標識などをリアルタイムで検出し、安全な運転を支援します。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            監視カメラ
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            不審者の検出、人数カウント、異常行動の検知などに活用されています。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            医療画像診断
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            X線やCT画像から腫瘍や病変を自動検出し、医師の診断を支援します。
          </Text>
        </ListItem>
      </List>

      <Text>
        佐治研での利用例としては、<b>車両検出(上、2022修論)</b>、<b>家屋検出(川村、2023修論)</b>などが挙げられます。
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
            Girshick, R., et al. (2014). "Rich feature hierarchies for accurate object detection and semantic segmentation." CVPR.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            Ren, S., et al. (2015). "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks." NeurIPS.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            Redmon, J., et al. (2016). "You Only Look Once: Unified, Real-Time Object Detection." CVPR.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            Liu, W., et al. (2016). "SSD: Single Shot MultiBox Detector." ECCV.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            Lin, T. Y., et al. (2017). "Focal Loss for Dense Object Detection." ICCV.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            <ChakraLink href="https://docs.ultralytics.com/" isExternal color="blue.500">
              Ultralytics YOLOv8 Documentation
            </ChakraLink>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" lineHeight="1.8">
            <ChakraLink href="https://paperswithcode.com/task/object-detection" isExternal color="blue.500">
              Papers with Code - Object Detection
            </ChakraLink>
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};

export default Method3;
