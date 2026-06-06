import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { AnimatedText } from "../components/AnimatedText";

const videoList = [
  `${process.env.PUBLIC_URL}/videos/home_1.webm`,
  `${process.env.PUBLIC_URL}/videos/home_2.webm`,
];

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const errorCountRef = useRef(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoError = () => {
    errorCountRef.current += 1;

    if (errorCountRef.current >= videoList.length) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
    errorCountRef.current = 0;

    videoRef.current?.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        setNeedsInteraction(true);
        setIsLoading(false);
      } else {
        handleVideoError();
      }
    });
  };

  const handleUserClick = () => {
    if (videoRef.current && needsInteraction) {
      videoRef.current.play().catch((error) => {
        handleVideoError();
      });
      setNeedsInteraction(false);
    }
  };

  return (
    <div>
      <Box
        position="relative"
        w="100%"
        h="60vh"
        overflow="hidden"
        bg="black"
        onClick={handleUserClick}
        cursor={needsInteraction ? "pointer" : "default"}
      >
        {!hasError ? (
          <>
            <Box
              as="video"
              ref={videoRef}
              src={videoList[currentVideoIndex]}
              muted
              preload="auto"
              playsInline
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              objectFit="cover"
              opacity={isLoading ? 0 : 1}
              transition="opacity 0.5s ease"
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              onLoadStart={handleVideoLoadStart}
              onCanPlay={handleVideoCanPlay}
            />

            {(isLoading || needsInteraction) && (
              <Flex
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                align="center"
                justify="center"
                bg="rgba(0,0,0,0.4)"
              >
                <Text color="white">
                  {needsInteraction ? "クリックして再生" : "Loading video..."}
                </Text>
              </Flex>
            )}
          </>
        ) : (
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="slate.800"
          />
        )}

        <Flex
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          align="center"
          justify="center"
          bg="rgba(0,0,0,0.4)"
          pointerEvents={needsInteraction ? "none" : "auto"}
        >
          <Heading color="white" size="2xl">
            画像処理を、体感しよう
          </Heading>
        </Flex>
      </Box>

      <Box p={4}>
        <Text as="h1" fontSize="3xl" fontWeight="bold" fontFamily="Arial">
          Welcome to Saji-lab !
        </Text>
        <AnimatedText mb={2}>
          <Text fontSize="xl" fontFamily="Verdana">
            本サイトでは佐治研究室でよく活用されている画像処理技術について紹介します。
            特に動画像を利用した処理について、参考書のみでは直感的な理解が追いつきづらいと考えています。
            それを補うために、フレーム間差分の利用や特徴点の追跡など、時系列データとして集まった画像に対する処理を中心に情報としてまとめます。
          </Text>
        </AnimatedText>

        <br />
        <AnimatedText mb={2}>
          <Text fontSize="xl" fontFamily="Verdana">
            画像処理に関する参考書やライブラリは数多くありますが、実際に手を動かしてみないと理解が進まないことも多いです。
            そこで、実際にコードを動かしながら学ぶことができるようなコンテンツを提供します。
          </Text>
        </AnimatedText>

        <br />
        <AnimatedText mb={2}>
          <Text fontSize="xl" fontFamily="Verdana">
            画像処理に関する知識を深めるために、ぜひこのサイトを活用してください。
            また、実際に手を動かしてみることで、より理解が深まると思います。Pythonでのサンプルコードも記載するので、ローカル環境で動作させてみましょう。
          </Text>
        </AnimatedText>
        <br />
      </Box>
    </div>
  );
};

export default Home;
