import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import "./App.css";
import Home from "./routes/Home";
import Manual from "./routes/Manual";
import Research from "./routes/Research";
import Methods from "./routes/Methods";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <Router>
      <Header title="（非公式）- 佐治研画像処理学習キット -" />
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Manual" element={<Manual />} />
          <Route path="/Methods" element={<Methods />} />
          <Route path="/Research" element={<Research />} />
        </Routes>
      </MainContent>
      <Footer />
    </Router>
  );
};

export default App;
