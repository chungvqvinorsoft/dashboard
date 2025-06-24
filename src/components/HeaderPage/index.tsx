import { Space, Typography } from "antd";
import className from "classnames/bind";
import styles from "./HeaderPage.module.css";
import React from "react";

const cx = className.bind(styles)

interface HeaderPageProps {
    title?: string,
    // icon
    prefix?: React.ReactNode
}
export default function HeaderPage({ title, prefix }: HeaderPageProps) {
    return (
        <Space size={'middle'} className={cx('header')}>
            {/* icon back */}
            
            {/* title */}
            <Typography.Title level={4} className={cx('title')}>
                {title ||''}
            </Typography.Title>
        </Space>
    )
}