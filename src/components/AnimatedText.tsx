import { useRef } from "react";
import { chakra, BoxProps } from "@chakra-ui/react";
import { motion, Variants, useInView } from "framer-motion";

const MotionBox = chakra(motion.div);

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type AnimatedTextProps = BoxProps & {
  children: React.ReactNode;
};

export function AnimatedText({ children, ...boxProps }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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
