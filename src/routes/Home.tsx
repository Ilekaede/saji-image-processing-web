import { Box, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

const Home = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        Welcome to Saji-lab !
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        本サイトでは佐治研究室で特に学ぶべき古典画像処理を紹介します．
        あくまで筆者の主観です．ご了承ください．
        <br />
        このページにはおすすめの画像処理勉強サイトでも載せておきます．参考にしてください．
      </Text>
      <div>
        <Link
          color="brand.500"
          href="https://algorithm.joho.info/image-processing-tutorial/"
          isExternal
        >
          <div>
            【画像処理入門】アルゴリズム＆プログラミング <FiExternalLink />
          </div>
        </Link>
      </div>
    </Box>
  );
};

export default Home;
