import { Image, Modal, ModalProps, Space, Typography } from "antd";
import warning from "../../assets/icons/error.svg";
import classNames from "classnames/bind";
import styles from "./Alert.module.css";

const cx = classNames.bind(styles);

interface AlertProps extends ModalProps {
  description: string;
}

export default function Alert({ description, ...props }: AlertProps) {
  return (
    <Modal {...props} centered width={360} height={360} >
      <Space direction="vertical" className={cx('space-modal')} align="center">
        <Image preview={false} height={64} src={warning} alt={warning} />
        <Typography.Title level={3}>{description}</Typography.Title>
      </Space>
    </Modal>
  );
}
