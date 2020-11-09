import React from "react";
import { store } from "../App";
import { history } from "../Router/createHistory";

const notAuthenticatedHOC = (ComposedComponent, asyncReducerNames) => {
    const authorized = localStorage.getItem("auth");
    // handle authorized
    if (authorized) {
        history.push("/dashboard1");
    } else {
        // inject the async reducer here.
        store.injectReducer(asyncReducerNames);
    }

    class NotAuthenticatedComposedComponent extends React.Component {
        render = () => <ComposedComponent />;
    }

    return NotAuthenticatedComposedComponent;
};

export default notAuthenticatedHOC;
