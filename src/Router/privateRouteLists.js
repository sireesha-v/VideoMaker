import React from "react";
import Loadable from "react-loadable";
import AppRoute from "./AppRoute";
import PageLoading from "../Components/PageLoading";
import { authenticatedHOC } from "../HOC";
import asyncReducerNameConstants from "../Reducer/AsyncReducers/asyncReducerConstants";

const RandomPrivateComponent = Loadable({
    loader: () => import("../Pages/RandomPrivatePage/RandomPrivatePage"),
    loading: PageLoading,
});

const RandomPrivateTwoComponent = Loadable({
    loader: () => import("../Pages/RandomPrivatePageTwo/RandomPrivatePageTwo"),
    loading: PageLoading,
});

/**--------  ** * Add private routes here (which requires auth) * **   ---------*/
const privateRoutesList = [
    {
        component: RandomPrivateComponent,
        asyncReducerNames: [
            asyncReducerNameConstants.RANDOM_PRIVATE_PAGE_REDUCER,
        ],
        path: "/counter",
        exact: true,
    },
    {
        component: RandomPrivateTwoComponent,
        asyncReducerNames: [
            asyncReducerNameConstants.RANDOM_PRIVATE_PAGE_TWO_REDUCER,
        ],
        path: "/dashboard",
        exact: true,
    },
];

const PrivateRoutes = () =>
    privateRoutesList.map((routeObject, index) => (
        <AppRoute
            {...routeObject}
            authNoAuthHOC={authenticatedHOC}
            key={index}
        />
    )) || [];

export default PrivateRoutes;
