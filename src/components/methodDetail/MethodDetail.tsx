import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Heading, Text, Button, Spinner, Center } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WORKER_URL = "https://articles-worker.a-sakuramotyo.workers.dev";

const MethodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setHasError(false);
    setMarkdown(null);
    setIsLoading(true);

    fetch(`${WORKER_URL}/articles/method${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

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
