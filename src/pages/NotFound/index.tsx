import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.css";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={cx("container")}>
      <h1 className={cx("code")}>404</h1>
      <p className={cx("title")}>Đường dẫn không tồn tại</p>
    </div>
  );
};

export default NotFound;
