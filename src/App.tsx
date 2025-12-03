import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import "katex/dist/katex.mjs";

// Lazy load route components
const Home = lazy(() => import("./routes/Home"));
const Manual = lazy(() => import("./routes/Manual"));
const Research = lazy(() => import("./routes/Research"));
const Methods = lazy(() => import("./routes/Methods"));
const MethodDetail = lazy(() => import("./components/methodDetail/MethodDetail"));

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Box minH="100vh" bg="slate.50">
        <Header title="（非公式）- 佐治研画像処理学習キット -" />
        <Sidebar />
        <MainContent>
          <Suspense
            fallback={
              <Flex
                justify="center"
                align="center"
                minH="calc(100vh - 200px)"
              >
                <Spinner size="xl" color="blue.500" thickness="4px" />
              </Flex>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Manual" element={<Manual />} />
              <Route path="/Methods" element={<Methods />} />
              <Route path="/Research" element={<Research />} />
              <Route path="/Methods/:id" element={<MethodDetail />} />
            </Routes>
          </Suspense>
        </MainContent>
        <Box ml={{ base: 0, md: 64 }}>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
