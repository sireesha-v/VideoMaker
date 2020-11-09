import React from "react";
import { store } from "../App";
import { history } from "../Router/createHistory";

const authenticatedHOC = (ComposedComponent, asyncReducerNames) => {
    const authorized = localStorage.getItem("auth");

    // handle authorized
    if (!authorized) {
        store.dispatch({ type: "LOGOUT_USER" });
        history.push("/");
    } else {
        // inject the async reducer here.
        store.injectReducer(asyncReducerNames);
    }

    class AuthenticatedComposedComponent extends React.Component {
        render = () => <ComposedComponent />;
    }

    return AuthenticatedComposedComponent;
};

export default authenticatedHOC;
