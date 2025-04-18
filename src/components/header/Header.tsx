import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import sajiRogo from "../icon/saji_rogo.png";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={2}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Link to="/">
          <Heading size="md" _hover={{ color: "blue.500" }}>
            {title}
          </Heading>
        </Link>
        <HStack spacing={4}>
          <IconButton
            as="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            icon={<FontAwesomeIcon icon={faGithub} />}
            variant="ghost"
            size="md"
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            icon={<FontAwesomeIcon icon={faXTwitter} />}
            variant="ghost"
            size="md"
          />
          <IconButton
            as="a"
            href="https://wwp.shizuoka.ac.jp/saji-lab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Saji Lab"
            icon={
              <img
                src={sajiRogo}
                alt="Saji Lab"
                style={{ width: "24px", height: "24px" }}
              />
            }
            variant="ghost"
            size="md"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
