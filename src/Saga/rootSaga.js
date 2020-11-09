import {all, takeLatest, call, put, delay} from "redux-saga/effects";
import {request} from "../Utils/request";
// TODO: This is an example of watcherSaga import --- Replace it with your
// watcher saga
import {globalWatcherSaga} from "./globalWatcherSaga";
import {RENDER_OUTPUT, RENDER_OUTPUT_STATUS} from "../Pages/RandomPublicPage/Container/NewVideoDashboard/NewVideoDashboard.constants";
import {storeVideoUrl} from "../Pages/RandomPublicPage/Container/NewVideoDashboard/NewVideoDashboard.reducer";
import {renderOutputStatus} from "../Pages/RandomPublicPage/Container/NewVideoDashboard/NewVideoDashboard.actions";

function getFetchData() {
    return {method: 'GET'};
}

function getPostData(data) {
    return {
        method: 'POST',
        body: JSON.stringify(data)
    };
}

//renderVideoOutput Saga
export function * renderVideoOutputSaga(action) {
    const {data} = action.payload;
    if (action) {
        const url = `/render`;
        try {
            const params = getPostData(data);
            const apiResponse = yield call(request(params), url);
            if (apiResponse && (apiResponse.success === true)) {
				yield delay(5000);
				yield put(renderOutputStatus({id: apiResponse.response.id}))
            } else {
                alert("error!1")
            }
        } catch (error) {
            console.log(error)
            alert("error!!", error)
        }
    }
}

//renderVideoOutput Status Saga
export function * renderVideoOutputStatusSaga(action) {
    const {id} = action.payload;
    if (action) {
        const url = `/render/${id}`;
        try {
            const params = getFetchData();
            const apiResponse = yield call(request(params), url);
            if (apiResponse && (apiResponse.success === true)) {
                if (apiResponse.response.status === 'done'){
					yield put(storeVideoUrl({showVideoModal: true, videoUrl: apiResponse.response.url}));
				}
                else {
					yield delay(5000);
                    yield put(renderOutputStatus({id}));
                }
            } else {
                yield put(renderOutputStatus({id}))
            }
        } catch (error) {
            console.log(error)
            alert("error!!", error)
        }
    }
}

// This will be the root saga for all the watcher sagas. We'll be using this
// root saga to run saga middleware
export default function * rootSaga() {
    const watcher = [];
    yield all([
        ...watcher,
        watcher.push(yield takeLatest(RENDER_OUTPUT, renderVideoOutputSaga)),
        watcher.push(yield takeLatest(RENDER_OUTPUT_STATUS, renderVideoOutputStatusSaga)),
        // TODO This is an example of using the watcher saga in rootSaga
        globalWatcherSaga()
    ]);
};