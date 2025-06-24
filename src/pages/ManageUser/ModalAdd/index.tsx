import { message, Modal, ModalProps } from "antd";
import classNames from "classnames/bind";
import styles from "./ModalAdd.module.css";
import FormInfo from "../../../components/FormInfo";
import { useForm } from "antd/es/form/Form";
import { infoUser } from "./config";
import { NewUserInfo, UserType } from "../../../types/manageUser";
import { useEffect } from "react";
import { accountsApi } from "../../../api/accounts";

const cx = classNames.bind(styles);

interface ModalAddProps extends ModalProps {
  info?: UserType;
}

export default function ModalAdd({ info, ...props }: ModalAddProps) {
  console.log(info);
  
  const { onCancel } = props;
  const [formInfo] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCacellForm = (e?: any) => {
    formInfo?.resetFields();
    if (onCancel) {
      onCancel(e);
    }
  };
  const handleEditUser = async (e: any) => {
    try {
      await formInfo.validateFields();
      const infoUser: NewUserInfo = {
        name: formInfo.getFieldValue("name"),
        username: formInfo.getFieldValue("username"),
        password: formInfo.getFieldValue("password"),
      };
      await accountsApi.put(infoUser, info?.id);
      if (onCancel) {
        onCancel(e);
      }
    } catch (error: any) {
      if (error?.errorFields) {
        formInfo.setFields(error.errorFields);
      } else {
        console.log(error);
        messageApi.error(error?.response?.data?.detail || "Có lỗi xảy ra");
      }
    }
  };
  const handleAddNew = async (e: any) => {
    try {
      await formInfo.validateFields();
      const infoUser: NewUserInfo = {
        name: formInfo.getFieldValue("name"),
        username: formInfo.getFieldValue("username"),
        password: formInfo.getFieldValue("password"),
      };
      await accountsApi.post(infoUser);
      if (onCancel) {
        onCancel(e);
      }
    } catch (error: any) {
      if (error?.errorFields) {
        formInfo.setFields(error.errorFields);
      } else {
        console.log(error);
        messageApi.error(error?.response?.data?.detail?.toString() || "Có lỗi xảy ra");
      }
    }
  };
  const handleSubmitForm = (e: any) => {
    if (info) {
      handleEditUser(e);
    } else {
      handleAddNew(e);
    }
  };

  useEffect(() => {
    if (info) {
      formInfo.setFieldValue("username", info?.username);
      formInfo.setFieldValue("name", info?.name);
      formInfo.setFieldValue("password", info?.password);
    } else {
      formInfo?.resetFields();
    }
  }, [info]);

  return (
    <Modal
      centered
      title={info ? "Chỉnh sửa thông tin người dùng" : "Thêm mới người dùng"}
      width={600}
      destroyOnHidden
      {...props}
      onCancel={handleCacellForm}
      onOk={handleSubmitForm}
    >
      {contextHolder}
      <FormInfo form={formInfo} listInfo={infoUser} />
    </Modal>
  );
}
