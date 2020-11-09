import React from "react";
import { withRouter } from "react-router";
import NewVideoDashboard from "./Container/NewVideoDashboard";

const RandomPublicPage = (props) => {
    return (
        <div>
           <NewVideoDashboard/>
        </div>
    )
};

export default withRouter(RandomPublicPage);