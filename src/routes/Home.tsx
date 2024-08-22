import { Box, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p={4}>
      <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
        Welcome to Saji-lab !
      </Text>
      <Text fontSize="xl" fontFamily="Verdana">
        本サイトでは佐治研究室で特に学ぶべき古典画像処理を紹介します．
        あくまで筆者の主観です．ご了承ください．
      </Text>
    </Box>
  );
};

export default Home;
