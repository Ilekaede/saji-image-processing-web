import "./Sidebar.css";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  FlexProps,
  VStack,
} from "@chakra-ui/react";
import { FiHome, FiStar, FiCompass, FiTrendingUp } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link } from "react-router-dom";

interface LinkItemProps {
  name: string;
  url?: string;
  icon: IconType;
}

const LinkItem: Array<LinkItemProps> = [
  { name: "Home", url: "/Home", icon: FiHome },
  { name: "画像の基礎知識", url: "/Manual", icon: FiCompass },
  { name: "画像処理手法", url: "/Methods", icon: FiStar },
  { name: "研究への応用", url: "/Research", icon: FiTrendingUp },
];

const Sidebar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      position="fixed"
      left={0}
      top={16}
      h="calc(100vh - 64px)"
      w={{ base: "full", md: 60 }}
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      zIndex={5}
    >
      <VStack spacing={1} align="stretch" p={2}>
        {LinkItem.map((link) => (
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  url?: string;
  children: ReactText;
}

const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
  const hoverBg = useColorModeValue("blue.50", "blue.900");
  const hoverColor = useColorModeValue("blue.600", "blue.200");

  return (
    <Link to={url || "#"} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: hoverBg,
          color: hoverColor,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: hoverColor,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default Sidebar;
