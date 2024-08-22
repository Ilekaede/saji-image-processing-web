import React from "react";
import "./MainContent.css";
import { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

const MainContent = ({ children }: MainContentProps) => {
  return <div className="main-content">{children}</div>;
};

export default MainContent;
