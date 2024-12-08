import React, { memo, Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import routes from "@/router";
import store from "@/store";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppPlayerBar from "./components/app-player-bar";
// 路由还没加载出来显示的组件
import AppRouterLoadingInterval from "./components/app-router-loading-interval";

export default memo(function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <AppHeader />
                <Suspense fallback={<AppRouterLoadingInterval />}>
                    {
                        renderRoutes(routes)
                    }
                </Suspense>
                <AppFooter />
                <AppPlayerBar />
            </HashRouter>
        </Provider>
    );
});

