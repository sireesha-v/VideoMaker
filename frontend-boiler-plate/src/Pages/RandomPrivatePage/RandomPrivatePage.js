import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser } from "../../Common/globalActions";
import { incrementAction, decrementAction } from "./RandomPrivatePage.reducer";

const RandomPrivatePage = (props) => {
    const {
        incrementAction,
        decrementAction,
        history,
        counterData,
        logoutUser,
    } = props;

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
        logoutUser();
    };

    const handleCounter = (boolean) => {
        if (boolean) {
            incrementAction(1);
        } else {
            decrementAction(1);
        }
    };

    const navigateToDashboard = () => {
        history.push("/dashboard1");
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <button
                onClick={() => {
                    handleCounter(false);
                }}
            >
                -
            </button>
            Counter: {counterData.asyncCounter}
            <button
                onClick={() => {
                    handleCounter(true);
                }}
            >
                +
            </button>
            <button onClick={navigateToDashboard}>Navigate To Dashboard1</button>
        </div>
    );
};

export default withRouter(
    connect(
        (state) => ({
            counterData:
                state.asynchronousCounter && state.asynchronousCounter.data,
        }),
        {
            incrementAction,
            decrementAction,
            logoutUser,
        }
    )(RandomPrivatePage)
);
