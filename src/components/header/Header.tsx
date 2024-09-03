import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import sajiRogo from "../icon/saji_rogo.png";
import "./Header.css";
import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <Link to={`/`}>
        <div className="logo">{title}</div>
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://wwp.shizuoka.ac.jp/saji-lab/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={sajiRogo} alt="Custom" className="custom-icon" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
