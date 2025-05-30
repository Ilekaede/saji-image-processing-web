import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { AnimatedText } from "../components/AnimatedText";

const videoList = [
  "/videos/fish_detection.mp4",
  "/videos/fox_pose_estimated.mp4",
];

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoError = () => {
    console.error("Video loading error");
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing video:", error);
          handleVideoError();
        });
      }
    }
  }, [currentVideoIndex]);

  return (
    <div>
      <Box position="relative" w="100%" h="60vh" overflow="hidden">
        <Box
          as="video"
          ref={videoRef}
          src={videoList[currentVideoIndex]}
          autoPlay
          muted
          loop={false}
          preload="auto"
          playsInline
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          onLoadStart={handleVideoLoadStart}
          onCanPlay={handleVideoCanPlay}
        />

        {isLoading && (
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
            <Text color="white">Loading video...</Text>
          </Flex>
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
