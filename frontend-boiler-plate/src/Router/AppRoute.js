import React from "react";
import { Route } from "react-router-dom";

const AppRoute = ({ component, authNoAuthHOC, asyncReducerNames, ...rest }) => <Route
    {...rest}
    component={authNoAuthHOC(component, asyncReducerNames)}
/>;

export default AppRoute;