import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export const routeMiddleware = routerMiddleware(history);

export const historyReducer = connectRouter(history);
