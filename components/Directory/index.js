import React from "react";
import Shopmen from "./../../assets/men.jpg";
import Shopwomen from "./../../assets/women.jpg";
import "./styles.scss";

const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${Shopwomen})` }}>
          <a> Shop Womens</a>
        </div>

        <div className="item" style={{ backgroundImage: `url(${Shopmen})` }}>
          <a> Shop Mens</a>
        </div>
      </div>
    </div>
  );
};
export default Directory;


