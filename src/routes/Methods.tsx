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
} from "@chakra-ui/react";
import { useState } from "react";
import TagSelector from "../components/method/TagSelector";
import { generateMethodContents } from "../utils/methodUtils";

const Methods = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const methodContents = generateMethodContents();

  // すべてのタグを取得
  const allTags = Array.from(
    new Set(methodContents.flatMap((content) => content.tags))
  );

  const filteredContents = selectedTag
    ? methodContents.filter((content) => content.tags.includes(selectedTag))
    : methodContents;

  return (
    <Box p={4}>
      <TagSelector
        tags={allTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      <Stack spacing={4} mt={4}>
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
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={content.image || "https://bit.ly/dan-abramov"}
                alt={content.title}
              />

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
