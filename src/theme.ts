import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Inter', 'Noto Sans JP', sans-serif",
    body: "'Inter', 'Noto Sans JP', sans-serif",
  },
  colors: {
    brand: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1", // Indigo 500
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  styles: {
    global: {
      body: {
        bg: "slate.50",
        color: "slate.800",
      },
      a: {
        color: "brand.600",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "slate.900",
      },
    },
  },
});

export default theme;
