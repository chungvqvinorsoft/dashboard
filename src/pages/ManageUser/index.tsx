import { useForm, useWatch } from "antd/es/form/Form";
import HeaderPage from "../../components/HeaderPage";
import FormInfo from "../../components/FormInfo";
import { filters } from "./config";
import { Button, Image, message, Space } from "antd";
import classNames from "classnames/bind";
import styles from "./ManagerUser.module.css";
import AntdButtonCustom from "../../components/AntdButtonCustom";
import AntdTableCustom from "../../components/AntdTableCustom";
import { ColumnsType } from "antd/es/table";
import { FilterParams, UserType } from "../../types/manageUser";
import { useEffect, useState } from "react";
import ModalAdd from "./ModalAdd";
import { accountsApi } from "../../api/accounts";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit_square.svg";
import Alert from "../../components/Alert";
import { formatHHMMSSDDMMYY } from "../../utils/timeFormat";

const cx = classNames.bind(styles);

export default function ManageUser() {
  const [filter] = useForm();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const [alertDelete, setAlertDelete] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const username = useWatch("username", filter);
  const name = useWatch("name", filter);

  const handleEdit = (record: UserType) => {
    setSelectedUser(record);
    setShowModalAdd(true);
  };
  const handleDelete = (record: UserType) => {
    setSelectedUser(record);
    setAlertDelete(true);
  };

  const handleAddNew = () => {
    setShowModalAdd(!showModalAdd);
    setSelectedUser(undefined);
    showModalAdd && setRefresh(!refresh);
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const params: FilterParams = {
        name: name?.length > 0 ? name : undefined,
        username: username?.length > 0 ? username : undefined,
      };
      const respones = await accountsApi.get(params);
      const users: Array<UserType> = respones.data?.map(
        (item: UserType, index: number) => {
          return {
            ...item,
            stt: index + 1,
          };
        }
      );
      setListUser(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setAlertDelete(false);
    setSelectedUser(undefined);
  };

  const handleAcceptdelete = async () => {
    try {
      await accountsApi.delete(selectedUser?.id);
      setAlertDelete(false);
      setRefresh(!refresh);
    } catch (error: any) {
      setAlertDelete(false);
      messageApi.error(
        error?.response?.data?.detail?.toString() || "Có lỗi xảy ra"
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [refresh, username, name]);

  const columns: ColumnsType<UserType> = [
    {
      key: "stt",
      dataIndex: "stt",
      title: "STT",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Họ và Tên",
    },
    {
      key: "username",
      dataIndex: "username",
      title: "Tên người dùng",
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Ngày tạo",
      align: "center",
      render: (_: any, record: UserType) => {
        return formatHHMMSSDDMMYY(record.createdAt);
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Hành động",
      align: "right",
      render: (_, record: UserType) => {
        return (
          <Space size={"small"}>
            <Button
              className={cx("action-btn")}
              onClick={() => handleEdit(record)}
            >
              <Image height={24} src={editIcon} alt="edit" preview={false} />
            </Button>
            <Button
              className={cx("action-btn")}
              onClick={() => handleDelete(record)}
            >
              <Image
                preview={false}
                height={24}
                src={deleteIcon}
                alt="delete"
              />
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Alert
        description={"Xóa người dùng"}
        open={alertDelete}
        onCancel={handleCancelDelete}
        onOk={handleAcceptdelete}
      />
      <HeaderPage title="Quản trị người dùng" />
      <Space className={cx("filter")} align="center">
        <FormInfo
          form={filter}
          listInfo={filters}
          direction="vertical"
          gutter={[24, 0]}
        />
        <AntdButtonCustom
          type="primary"
          className={cx("addnew-btn")}
          onClick={handleAddNew}
        >
          Thêm mới
        </AntdButtonCustom>
      </Space>
      <div className={cx("table")}>
        <AntdTableCustom
          loading={loading}
          columns={columns as any}
          rowKey={(record) => record.uid}
          dataSource={listUser}
          size="small"
        />
      </div>
      <ModalAdd
        open={showModalAdd}
        onCancel={handleAddNew}
        info={selectedUser}
      />
    </>
  );
}
