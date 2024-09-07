"use client";

import { motion } from "framer-motion";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Sajilogo from "../components/icon/saji_rogo.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      navigate(`/home`);
    }, 300);
  };
  const MotionBox = motion(Box);
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Saji Study Web⭐️
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              (Not Official)
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            {/* The project board is an exclusive resource for contract work.
            It&apos;s perfect for freelancers, agencies, and moonlighters. */}
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Flex align="center" justify="center">
              <Button
                onClick={handleClick}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                _active={{
                  transform: "scale(0.95)",
                  boxShadow: "0 0 0 10px rgba(66, 153, 225, 0.6)", // ボタン周りに広がる光
                }}
              >
                Study Start!
              </Button>
              <MotionBox
                ml={4} // ボタンとの間にスペースを入れる
                animate={{
                  x: [-10, 10, -10], // 左右に揺れる
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowBackIcon w={8} h={8} color="blue.500" />
              </MotionBox>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} mt={250} ml={250}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image alt={"Login Image"} src={Sajilogo} />
        </motion.div>
      </Flex>
    </Stack>
  );
};
export default Hero;
