import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  FlexProps,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiHome, FiStar, FiCompass, FiTrendingUp } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link, useLocation } from "react-router-dom";

interface LinkItemProps {
  name: string;
  url?: string;
  icon: IconType;
}

const LinkItem: Array<LinkItemProps> = [
  { name: "Home", url: "/", icon: FiHome },
  { name: "画像の基礎知識", url: "/Manual", icon: FiCompass },
  { name: "画像処理手法", url: "/Methods", icon: FiStar },
  { name: "研究への応用", url: "/Research", icon: FiTrendingUp },
];

const Sidebar = () => {
  const bg = useColorModeValue("white", "slate.900");
  const borderColor = useColorModeValue("slate.200", "slate.700");

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={{ base: "full", md: 64 }}
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      zIndex={5}
      pt={20} // Space for header
      display={{ base: "none", md: "block" }}
    >
      <VStack spacing={2} align="stretch" p={4}>
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
  const location = useLocation();
  const isActive = location.pathname === url;
  const activeBg = useColorModeValue("brand.50", "brand.900");
  const activeColor = useColorModeValue("brand.600", "brand.200");
  const hoverBg = useColorModeValue("slate.50", "slate.800");

  return (
    <Link to={url || "#"} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="3"
        mx="0"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? activeColor : "inherit"}
        fontWeight={isActive ? "bold" : "medium"}
        transition="all 0.2s"
        _hover={{
          bg: isActive ? activeBg : hoverBg,
          color: isActive ? activeColor : "brand.500",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="18"
            as={icon}
            color={isActive ? activeColor : "slate.400"}
            _groupHover={{
              color: isActive ? activeColor : "brand.500",
            }}
          />
        )}
        <Text fontSize="sm">{children}</Text>
      </Flex>
    </Link>
  );
};

export default Sidebar;
