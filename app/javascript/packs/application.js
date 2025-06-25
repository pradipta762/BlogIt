import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import App from "../src/App";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Logger from "js-logger";

initializeLogger();
setAuthHeaders();

Logger.info(App);
console.log("Hello");

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  console.log(name);
  return componentsContext[name];
};
