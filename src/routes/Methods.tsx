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
  Box,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { generateMethodContents } from "../utils/methodUtils";

const Methods = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const methodContents = useMemo(() => generateMethodContents(), []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const generateSuggestions = useCallback(
    (query: string) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const queryLower = query.toLowerCase();
      const allSuggestions = new Set<string>();

      methodContents.forEach((content) => {
        // タイトルから候補を生成
        if (content.title.toLowerCase().includes(queryLower)) {
          allSuggestions.add(content.title);
        }

        // タグから候補を生成
        content.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(queryLower)) {
            allSuggestions.add(tag);
          }
        });
      });

      setSuggestions(Array.from(allSuggestions).slice(0, 5));
    },
    [methodContents]
  );

  useEffect(() => {
    generateSuggestions(searchQuery);
  }, [searchQuery, generateSuggestions]);

  const filteredContents = isSearching
    ? methodContents.filter((content) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        content.title.toLowerCase().includes(searchLower) ||
        content.overview.toLowerCase().includes(searchLower) ||
        content.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        (content.searchableContent &&
          content.searchableContent.toLowerCase().includes(searchLower))
      );
    })
    : methodContents;

  const handleSearch = () => {
    setIsSearching(true);
    onClose();
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsSearching(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearching(true);
    onClose();
  };

  return (
    <Box p={4}>
      <Box position="relative" width="100%" maxW="600px" mb={4}>
        <InputGroup>
          <Input
            placeholder="記事を検索"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(false);
              onOpen();
            }}
            onFocus={onOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            ref={inputRef}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleSearch}
              colorScheme="blue"
            >
              <SearchIcon color="gray.300" />
            </Button>
          </InputRightElement>
        </InputGroup>

        {isOpen && suggestions.length > 0 && (
          <Box
            position="absolute"
            zIndex={1}
            width="100%"
            bg="white"
            boxShadow="md"
            borderRadius="md"
            mt={0}
          >
            {suggestions.map((suggestion, index) => (
              <Box
                key={index}
                p={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Stack spacing={4}>
        {filteredContents.map((content) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: content.id * 0.2 }}
          >
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              {content.image && (
                <Image
                  objectFit="cover"
                  w={{ base: "100%", sm: "200px" }}
                  h={{ base: "200px", sm: "200px" }}
                  src={content.image}
                  alt={content.title}
                />
              )}

              <Stack>
                <CardBody>
                  <Heading size="md">{content.title}</Heading>
                  <Text py="2">{content.overview}</Text>
                  <Stack direction="row" spacing={2} mt={2}>
                    {content.tags.map((tag, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        colorScheme="gray"
                        onClick={() => handleTagClick(tag)}
                        _hover={{ bg: "gray.100" }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>
                </CardBody>

                <CardFooter>
                  <Link to={`/methods/${content.id}`}>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      _active={{
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 10px rgba(66, 153, 225, 0.6)",
                      }}
                    >
                      View More
                    </Button>
                  </Link>
                </CardFooter>
              </Stack>
            </Card>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

export default Methods;
