// NumPyを使うことのメリット
import React from "react";
import { Box, Text, List, ListItem, Flex, Image } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import pythonPC from "../components/image/python_in_pc.png";
// メタデータの定義
export const methodMetadata = {
  id: 7,
  title: "ループ書くときはNumPyを使おう",
  overview:
    "Pythonの画像処理って速度遅いな〜二重ループなんてやってられないよ;;と思っているそこのあなた向け",
  tags: ["画像処理", "NumPy"],
  image: pythonPC,
  searchableContent: "NumPy Python 配列 ベクトル化 高速化 行列演算 ndarray ループ最適化 パフォーマンス",
};

const Method7 = () => {
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
        mb={8}
      >
        <Box flex="1">
          <Text
            as="h1"
            fontSize="3xl"
            fontWeight="bold"
            fontFamily="Arial"
            mb={2}
          >
            {methodMetadata.title}
          </Text>
        </Box>
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={pythonPC}
            alt="PythonとNumPyの関係を示す図"
            maxH="300px"
            maxW="300px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        NumPyとは
      </Text>
      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mb={6}>
        NumPy(Numerical
        Python)は、Pythonで数値計算を効率的に行うためのライブラリです。特に多次元配列を扱うための強力な機能と、様々な数値計算用の関数を提供しており、Pythonで科学技術計算やデータ分析を行う際に欠かせないツールとなっています。また、Matplotlib、Pandas、OpenCVなどのPythonライブラリと組み合わせてよく利用され、重要な役割を果たします。こと画像処理においても2次元配列への処理が基本的なため、Pythonでコーディングする人にとって利用が必須となっています。
      </Text>

      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Arial"
        mt={8}
        mb={4}
      >
        NumPyを利用するメリット
      </Text>
      <List spacing={4} styleType="decimal" pl={4}>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            高速な計算
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            NumPyが高速な計算を可能にする理由は、その内部構造と設計にあります。Pythonの標準リストが任意の型のオブジェクトを格納できるのに対し、NumPyのndarrayは単一のデータ型（例えば、全て整数、全て浮動小数点数など）の要素のみを格納します。これにより、データがメモリ上で連続的に配置され、C言語で最適化された内部ルーチンがこの連続したメモリブロックに対して効率的に操作を実行できるようになります。Pythonの標準的なループ処理では、各要素の型チェックやメモリ上の非連続な配置によるオーバーヘッドが発生するため、NumPyに比べて大幅に遅くなります。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            多次元配列の操作
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            NumPyの核となるデータ構造はndarray(N-dimensionalarray)と呼ばれる多次元配列オブジェクトです。このndarrayを使うことで、ベクトル、行列、さらにはそれ以上の次元を持つデータを直感的に表現し、操作できます。例えば、行列の積や転置といった操作も、NumPyを使えばごく短いコードで記述でき、データの構造を把握しやすくなります。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            ループ処理の簡潔な記述
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            Pythonのforループは柔軟性が高い一方で、処理速度のボトルネックになることがあります。NumPyでは、「ブロードキャスト」と呼ばれる機能や、要素ごとの演算を直接配列に対して適用できる「ベクトル化」という概念が導入されています。これにより、明示的なループを書くことなく、配列全体に対して一括で処理を適用できるため、コードがより簡潔になり、可読性も向上します。結果として、開発効率も大きく高まります。
          </Text>
        </ListItem>

        <ListItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            豊富な数値計算関数
          </Text>
          <Text fontSize="md" lineHeight="1.8">
            線形代数、フーリエ変換、乱数生成など、科学技術計算で必要とされる多岐にわたる関数がNumPyには標準で備わっています。これにより、研究者やエンジニアは複雑な計算をゼロから実装する必要がなく、既存の信頼性の高い関数を利用して効率的に開発を進められます。これらの関数は内部的に最適化されているため、高いパフォーマンスを期待できる点も重要です。
          </Text>
        </ListItem>
      </List>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8" mt={8} mb={6}>
        画像処理の例として、シンプルな「画像の反転」（ピクセル値の最大値からの減算）を考えてみましょう。通常、画像のピクセルは0から255の範囲の数値で表されます。この処理をPythonの標準リストとNumPyで記述し、その実行時間を比較することで、NumPyの速度優位性を明確に示せます。
        ここでは、擬似的な画像データを作成し、そのピクセル値を反転させる処理を行います。実際の画像ファイルは使用せず、数値の2次元配列として画像を表現します。
      </Text>

      <Flex direction={{ base: "column", lg: "row" }} gap={6} mb={8}>
        <Box flex="1" borderRadius="md" overflow="hidden">
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            customStyle={{
              fontSize: "0.80rem",
              padding: "1rem",
              margin: 0,
            }}
          >
            {`
import time
import numpy as np
IMAGE_WIDTH = 1000
IMAGE_HEIGHT = 1000
MAX_PIXEL_VALUE = 255

# --- Pythonの標準リストによる処理 ---
def invert_image_python_list(image_list):
    inverted_image = []
    for row in image_list:
        new_row = []
        for pixel in row:
            new_row.append(MAX_PIXEL_VALUE - pixel)
        inverted_image.append(new_row)
    return inverted_image

image_python_list = [[int(np.random.rand() * MAX_PIXEL_VALUE) 
                      for _ in range(IMAGE_WIDTH)] 
                     for _ in range(IMAGE_HEIGHT)]

print("--- Pythonの標準リストによる処理 ---")
start_time_list = time.time()
inverted_image_list = invert_image_python_list(image_python_list)
end_time_list = time.time()
print(f"処理時間: {end_time_list - start_time_list:.6f} 秒")

`}
          </SyntaxHighlighter>
        </Box>
        <Box flex="1" borderRadius="md" overflow="hidden">
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            customStyle={{
              fontSize: "0.80rem",
              padding: "1rem",
              margin: 0,
            }}
          >
            {`
import time
import numpy as np
IMAGE_WIDTH = 1000
IMAGE_HEIGHT = 1000
MAX_PIXEL_VALUE = 255

# --- NumPyによる処理 ---
def invert_image_numpy(image_array):
    inverted_image = MAX_PIXEL_VALUE - image_array
    return inverted_image

image_numpy_array = np.random.randint(0, MAX_PIXEL_VALUE + 1, 
                                      size=(IMAGE_HEIGHT, IMAGE_WIDTH), 
                                      dtype=np.uint8)

print("--- NumPyによる処理 ---")
start_time_numpy = time.time()
inverted_image_numpy_array = invert_image_numpy(image_numpy_array)
end_time_numpy = time.time()
print(f"処理時間: {end_time_numpy - start_time_numpy:.6f} 秒")

`}
          </SyntaxHighlighter>
        </Box>
      </Flex>

      <Text fontSize="md" fontFamily="Verdana" lineHeight="1.8">
        比較したときに、NumPyで記述されたコードのほうがスッキリした印象を受けると思います。2つのコードを実行することで処理にどれくらいタイム差が生じるか、ぜひ調べてみましょう。
      </Text>
    </Box>
  );
};

export default Method7;
