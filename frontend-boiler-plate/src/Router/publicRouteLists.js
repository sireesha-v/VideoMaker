import React from "react";
import Loadable from "react-loadable";
import AppRoute from "./AppRoute";
import { notAuthenticatedHOC } from "../HOC";
import PageLoading from "../Components/PageLoading";
import asyncReducerNameConstants from "../Reducer/AsyncReducers/asyncReducerConstants";

const RandomPublicPage = Loadable({
    loader: () => import("../Pages/RandomPublicPage/RandomPublicPage"),
    loading: PageLoading,
});

/**--------  ** * Add public routes here (which doesn't require auth) * **   ---------*/
const publicRoutesList = [
    {
        component: RandomPublicPage,
        asyncReducerNames: [asyncReducerNameConstants.NEW_VIDEO_DASHBOARD],
        path: "/",
        exact: true,
    },
];

/**--------  ** * Routes ends here * **   ---------*/

const PublicRoutes = () =>
    publicRoutesList.map((routeObject, index) => (
        <AppRoute
            {...routeObject}
            authNoAuthHOC={notAuthenticatedHOC}
            key={index}
        />
    )) || [];

export default PublicRoutes;
