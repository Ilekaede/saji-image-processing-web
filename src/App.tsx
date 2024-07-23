import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/mainContent/MainContent";
import Manual from "./pages/Manual";
import Methods from "./pages/Methods";
import Research from "./pages/Research";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header title="（非公式）- 佐治研画像処理学習キット -" />
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/manual" element={<Manual />} />
            <Route path="/methods" element={<Methods />} />
            <Route path="/research" element={<Research />} />
            <Route
              path="/"
              element={
                <div>
                  <h1>Welcome to My Website</h1>
                  <p>
                    This is the main content area. Scroll to see the sidebar
                    stay fixed.
                  </p>
                </div>
              }
            />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
};

export default App;
