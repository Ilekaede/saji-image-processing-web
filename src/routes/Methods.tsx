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

const articles = [
  { id: 1, title: "2値化", overview: "2値化をより応用的に学んでみましょう" },
  { id: 2, title: "特徴点抽出", overview: "特徴点抽出とは？" },
  { id: 3, title: "深層学習と画像処理", overview: "まとめる" },
  { id: 4, title: "ハフ変換", overview: "ハフ変換とは〜" },
];

const Methods = () => {
  return (
    <div>
      <ul>
        {articles.map((article) => (
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
                </CardBody>

                <CardFooter>
                  <Link to={`/methods/${article.id}`}>
                    <Button variant="solid" colorScheme="blue">
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
