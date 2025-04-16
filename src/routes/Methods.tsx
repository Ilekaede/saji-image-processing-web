import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import TagSelector from "../components/method/TagSelector";

const articles = [
  {
    id: 1,
    title: "2値化",
    overview: "2値化をより応用的に学んでみましょう",
    tags: ["画像処理", "2値化"],
  },
  {
    id: 2,
    title: "特徴点抽出",
    overview: "特徴点抽出とは？",
    tags: ["画像処理", "特徴点"],
  },
  {
    id: 3,
    title: "深層学習と画像処理",
    overview: "まとめる",
    tags: ["画像処理", "深層学習"],
  },
  {
    id: 4,
    title: "ハフ変換",
    overview: "ハフ変換とは〜",
    tags: ["画像処理", "ハフ変換"],
  },
  {
    id: 5,
    title: "ノイズ除去を除去したい -フィルタ編-",
    overview: "なかなか注目がいかないノイズ除去について述べる．実はかなり重要",
    tags: ["画像処理", "ノイズ"],
  },
  {
    id: 6,
    title: "特徴点マッチング",
    overview: "特徴点マッチングを使ってみよう",
    tags: ["画像処理", "特徴点マッチング"],
  },
];

const Methods = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags?.includes(selectedTag))
    : articles;
  return (
    <div>
      <div>
        <TagSelector
          tags={["深層学習", "ハフ変換"]}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
      </div>
      <ul>
        {filteredArticles.map((article) => (
          <motion.li
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: article.id * 0.2 }}
          >
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              marginBottom="20px"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://bit.ly/dan-abramov"
                alt="free-image"
              />

              <Stack>
                <CardBody>
                  <Heading size="md">{article.title}</Heading>
                  <Text py="2">{article.overview}</Text>
                  <Stack direction="row" spacing={2} mt={2}>
                    {article.tags?.map((tag, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        colorScheme="gray"
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>
                </CardBody>

                <CardFooter>
                  <Link to={`/methods/${article.id}`}>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      _active={{
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 10px rgba(66, 153, 225, 0.6)", // ボタン周りに広がる光
                      }}
                    >
                      View More
                    </Button>
                  </Link>
                </CardFooter>
              </Stack>
            </Card>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Methods;
