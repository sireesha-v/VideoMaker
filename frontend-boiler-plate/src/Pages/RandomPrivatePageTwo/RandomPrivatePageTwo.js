import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser } from "../../Common/globalActions";

const RandomPrivatePageTwo = (props) => {
    const { history, logoutUser } = props;

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
        logoutUser();
    }

    const navigateToCounter = () => {
        history.push("/counter");
    }

    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>

            <button onClick={navigateToCounter}>Go to Counter</button>
        </div>
    )
};

export default withRouter(
    connect(
        null,
        {
            logoutUser
        }
    )(RandomPrivatePageTwo)
);