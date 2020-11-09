import React from "react";
import { Provider } from "react-redux";
import initializeStore from "./Reducer/initializeStore";
import 'antd/dist/antd.css';
import './index.css';
import Routes from "./Router";

export const store = initializeStore();

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);

export default App;
