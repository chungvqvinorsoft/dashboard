import { Button, ButtonProps } from "antd";
import classNames from "classnames/bind";
import styles from "./AntdButtonCustom.module.css";
import React from "react";

const cx = classNames.bind(styles);
interface AntdButtonCustomProps extends ButtonProps {
    className?: string,
    children?: React.ReactNode,
}

function AntdButtonCustom({ className, children ,...props }: AntdButtonCustomProps) {
    return (
        <Button  className={cx("btn", `${className}`)} {...props}>
            {children}
        </Button>
    )
}

export default AntdButtonCustom;