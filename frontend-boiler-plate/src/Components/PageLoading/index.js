import React from "react";

/**
 * Loading component for the react-loadable.
 */
const Loading = ({ error, retry, pastDelay, timedOut }) => {
    if (error) {
        return <div>Error! <button onClick={retry}>Retry</button></div>;
    } else if (timedOut) {
        return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
    } else if (pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

export default Loading;