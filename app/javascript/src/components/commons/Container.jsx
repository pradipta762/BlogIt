import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "../Sidebar";

const Container = ({ children, className = "" }) => (
  <div className="flex">
    <Sidebar />
    <div className={classnames("max-w-6xl px-6", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
