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
  const bg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={bg}
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="transparent"
      boxShadow="sm"
      px={4}
      py={2}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Link to="/">
          <Heading size="md" color="brand.600" _hover={{ color: "brand.500" }}>
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
            color="slate.600"
            _hover={{ bg: "brand.50", color: "brand.600" }}
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
            color="slate.600"
            _hover={{ bg: "brand.50", color: "brand.600" }}
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
            _hover={{ bg: "brand.50" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
