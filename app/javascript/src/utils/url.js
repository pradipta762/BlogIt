import { keysToSnakeCase } from "@bigbinary/neeto-cist";
import Logger from "js-logger";
import { stringify } from "qs";
import { isEmpty, toPairs, omit, pipe } from "ramda";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  Logger.info(route, params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
