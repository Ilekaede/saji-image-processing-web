import { useParams, Link } from "react-router-dom";
import { Box, Heading, Text, Button, Spinner, Center } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useQuery } from "@tanstack/react-query";

const WORKER_URL = "https://articles-worker.a-sakuramotyo.workers.dev";

const fetchArticle = async (id: string): Promise<string> => {
  const res = await fetch(`${WORKER_URL}/articles/method${id}`);
  if (!res.ok) throw new Error("Not Found");
  return res.text();
};

const MethodDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: markdown, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id!),
    enabled: !!id,
    retry: false,
  });

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
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

  return (
    <Box p={4} maxW="900px" mx="auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={4} mt={6}>
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={3} mt={6}>
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} mt={4}>
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text fontSize="md" lineHeight="1.8" mb={4}>
              {children}
            </Text>
          ),
          li: ({ children }) => (
            <Text as="li" fontSize="md" lineHeight="1.8" ml={4}>
              {children}
            </Text>
          ),
          code: ({ children }) => (
            <Box
              as="code"
              bg="gray.100"
              px={1}
              py={0.5}
              borderRadius="sm"
              fontSize="sm"
              fontFamily="mono"
            >
              {children}
            </Box>
          ),
          pre: ({ children }) => (
            <Box
              as="pre"
              bg="gray.100"
              p={4}
              borderRadius="md"
              overflowX="auto"
              mb={4}
              fontSize="sm"
              fontFamily="mono"
            >
              {children}
            </Box>
          ),
        }}
      >
        {markdown ?? ""}
      </ReactMarkdown>
      <Button as={Link} to="/Methods" colorScheme="blue" mt={8}>
        一覧に戻る
      </Button>
    </Box>
  );
};

export default MethodDetail;
