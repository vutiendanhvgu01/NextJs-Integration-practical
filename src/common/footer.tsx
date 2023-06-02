import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <ul className="footer-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <ul className="footer-social-icons">
        <li>
          <a href="#">
            <i className="fab fa-facebook" />
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
        </li>
      </ul>
      <p>© 2023 Your Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
