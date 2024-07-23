import React from "react";
import "./MainContent.css";

type MainContentProps = {
  children: React.ReactNode;
};

const MainContent = ({ children }: MainContentProps) => {
  return <div className="main-content">{children}</div>;
};

export default MainContent;
