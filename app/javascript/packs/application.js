import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import App from "../src/App";

initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
