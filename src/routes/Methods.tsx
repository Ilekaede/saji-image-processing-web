import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import sajiRogo from "../icon/saji_rogo.png";

const articles = [
  { id: 1, title: "2値化" },
  { id: 2, title: "特徴点抽出" },
];

const Methods = () => {
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
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

                  <Text py="2">2値化をより応用的に学んでみましょう</Text>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Methods;
