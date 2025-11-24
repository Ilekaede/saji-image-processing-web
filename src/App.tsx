import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import Home from "./routes/Home";
import Manual from "./routes/Manual";
import Research from "./routes/Research";
import Methods from "./routes/Methods";
import Footer from "./components/footer/footer";
import MethodDetail from "./components/methodDetail/MethodDetail";
import { Box } from "@chakra-ui/react";
import "katex/dist/katex.mjs";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Box minH="100vh" bg="slate.50">
        <Header title="（非公式）- 佐治研画像処理学習キット -" />
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Manual" element={<Manual />} />
            <Route path="/Methods" element={<Methods />} />
            <Route path="/Research" element={<Research />} />
            <Route path="/Methods/:id" element={<MethodDetail />} />
          </Routes>
        </MainContent>
        <Box ml={{ base: 0, md: 64 }}>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
