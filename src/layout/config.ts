import { routerConfig } from "../config";
import person from "../assets/icons/person.svg";
import chat from "../assets/icons/inbox_text_person.svg";
export const menus = [
    {
        to: routerConfig.manageUser,
        icon: person,
        label: 'Quản trị người dùng',
        key: 'user-manager'
    },
     {
        to: routerConfig.historyChat,
        icon: chat,
        label: 'Lịch sử thanh toán',
        key: 'history-pay'
    }
]