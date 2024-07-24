import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import "./App.css";
import Home from "./routes/Home";
import Manual from "./routes/Manual";

const App = () => {
  return (
    <Router>
      <Header title="（非公式）- 佐治研画像処理学習キット -" />
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Manual" element={<Manual />} />
          {/* Add more routes here */}
        </Routes>
      </MainContent>
    </Router>
  );
};

export default App;
