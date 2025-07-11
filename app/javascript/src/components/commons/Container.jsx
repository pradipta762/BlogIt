import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "../SideNavBar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <div
      className={classnames("flex-1 overflow-y-hidden px-6 py-10", [className])}
    >
      {children}
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
