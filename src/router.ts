import React from "react";
import { routerConfig } from "./config";
import ManageUser from "./pages/ManageUser";
import Login from "./pages/Login";
import HistoryChat from "./pages/HistoryChat";
import NotFound from "./pages/NotFound";

type RouterType = {
    to: string,
    page: React.ComponentType,
    layout: boolean
}

export const routers: Array<RouterType> = [
    {
        to: routerConfig.login,
        page: Login ,
        layout: false,
    },
    {
        to: routerConfig.manageUser,
        page: ManageUser ,
        layout: true,
    },
    {
        to: routerConfig.historyChat,
        page: HistoryChat ,
        layout: true,
    },
    {
        to: routerConfig.notFound,
        page: NotFound ,
        layout: true,
    },
]