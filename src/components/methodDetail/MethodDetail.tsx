import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const MethodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setComponent(null);
    import(`../../content/Method${id}.tsx`)
      .then((module) => {
        setComponent(() => module.default);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      });
  }, [id]);

  if (hasError) {
    return (
      <Box textAlign="center" py={20}>
        <Heading size="2xl" mb={4}>
          404
        </Heading>
        <Text mb={6}>ページが見つかりませんでした</Text>
        <Button as={Link} to="/Methods" colorScheme="blue">
          画像処理手法一覧に戻る
        </Button>
      </Box>
    );
  }

  return <div>{Component ? <Component /> : <p>Loading...</p>}</div>;
};

export default MethodDetail;
