import { Component } from "react";
import "./css/Nav.scss";
import { motion } from "framer-motion";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <nav className="navigation">
          <div className=" author">AHvrlk</div>
          <div className="container">
            <ul className="navbar-nav">
              <motion.li className="nav-item" whileHover={{ scale: 1.1 }}>
                <nav className="nav-link">Hotels</nav>
              </motion.li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
