// AnimatedText.tsx
import { chakra, BoxProps } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { useInView } from "../hooks/useInView";

const MotionBox = chakra(motion.div);

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface AnimatedTextProps extends BoxProps {
  children: React.ReactNode;
}

export function AnimatedText({ children, ...boxProps }: AnimatedTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <MotionBox
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...boxProps}
    >
      {children}
    </MotionBox>
  );
}
