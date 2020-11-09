import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import { history } from "./createHistory";
import PublicRoutes from "./publicRouteLists";
import PrivateRoutes from "./privateRouteLists";

const redirectRoutes = [
    <Route path="/no-match" exact render={() => <div>No Match found</div>} />,
    <Route path="/" exact render={() => <Redirect to="/dashboard" />} />,
    <Redirect to="/no-match" />
];

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            {[
                ...PublicRoutes(),
                ...PrivateRoutes(),
                ...redirectRoutes
            ]}
        </Switch>
    </ConnectedRouter>
);


export default Routes;