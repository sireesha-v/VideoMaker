import asyncReducerNameConstants from "./asyncReducerConstants";
import randomPrivatePageReducer from "../../Pages/RandomPrivatePage/RandomPrivatePage.reducer";
import randomPrivatePageTwoReducer from "../../Pages/RandomPrivatePageTwo/RandomPrivatePageTwo.reducer";
import NewVideoDashboardPageReducer from "../../Pages/RandomPublicPage/Container/NewVideoDashboard/NewVideoDashboard.reducer";
/**
 * Asynchronous reducer objects mapping
 */
const asyncReducersObjectMapping = {
    [asyncReducerNameConstants.RANDOM_PRIVATE_PAGE_REDUCER]: randomPrivatePageReducer,
	[asyncReducerNameConstants.RANDOM_PRIVATE_PAGE_TWO_REDUCER]: randomPrivatePageTwoReducer,
	[asyncReducerNameConstants.NEW_VIDEO_DASHBOARD]: NewVideoDashboardPageReducer
};

export default asyncReducersObjectMapping;
