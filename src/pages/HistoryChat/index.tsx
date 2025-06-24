import HeaderPage from "../../components/HeaderPage";
import { useForm, useWatch } from "antd/es/form/Form";
import FormInfo from "../../components/FormInfo";
import { filters } from "./config";
import { Button, Image, message, Space, Tag } from "antd";
import classNames from "classnames/bind";
import styles from "./ManagerUser.module.css";
import AntdTableCustom from "../../components/AntdTableCustom";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { conversationsApi } from "../../api/conversations";
import { PayType, FilterParams } from "../../types/historyPay";
import deleteIcon from "../../assets/icons/delete.svg";
import Alert from "../../components/Alert";
import { formatHHMMSSDDMMYY } from "../../utils/timeFormat";
const cx = classNames.bind(styles);

export default function HistoryChat() {
  const [filter] = useForm();
  const [listChat, setListChat] = useState<PayType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedBill, setSelectedBill] = useState<PayType>();
  const [messageApi, contextHolder] = message.useMessage();
  const [resfresh, setRefresh] = useState<boolean>(false);
  const payCode = useWatch("payCode", filter);

  const handleDelete = (record: PayType) => {
    setSelectedBill(record);
    setShowAlert(true);
  };

  const handleCancelModal = () => {
    setSelectedBill(undefined);
    setShowAlert(false);
  };

  const handleAcceptDelete = async () => {
    try {
      const uid = localStorage.getItem('id') || '';
      await conversationsApi.deleteById(selectedBill?.id, uid);
      setShowAlert(false);
      setSelectedBill(undefined);
      setRefresh(!resfresh);
    } catch (error: any) {
      setShowAlert(false);
      messageApi.error(
        error?.response?.data?.detail?.toString() || "Có lỗi xảy ra"
      );
    }
  };

  const columns: ColumnsType<PayType> = [
    {
      key: "stt",
      dataIndex: "stt",
      title: "STT",
    },
    {
      key: "payCode",
      dataIndex: "payCode",
      title: "Mã hóa đơn",
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Ngày tạo",
      align: "center",
      render: (_: any, record: PayType) => {
        return formatHHMMSSDDMMYY(record.createdAt);
      },
    },
    {
      key: "payValue",
      dataIndex: "payValue",
      title: "Số tiền thanh toán",
      align: "center",
      render: (_: any, record: PayType) => {
        return `${record.payValue} $`;
      },
    },
    {
      key: "payMess",
      dataIndex: "payMess",
      title: "Nội dung",
      align: "left",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Trạng thái",
      align: "left",
      render: (_: any, record: PayType) => {
        return (
          <Tag color={record.status ? "#87d068" : "#f50"}>
            {record.status ? "Thành công" : "Không thành công"}
          </Tag>
        );
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Hành động",
      align: "center",
      render: (_, record: PayType) => {
        return (
          <Space size={"small"}>
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

  const getListConversation = async () => {
    try {
      setLoading(true);
      const params: FilterParams = {
        payCode: payCode?.trim()?.length > 0 ? payCode : undefined,
      };
      const id = localStorage?.getItem("id") || "";
      const respones = await conversationsApi.get(id, params);
      const chats: PayType[] = respones?.data?.map(
        (item: PayType, index: number) => {
          return {
            stt: index + 1,
            ...item,
          };
        }
      );
      setListChat(chats);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListConversation();
  }, [resfresh, payCode]);

  return (
    <>
      {contextHolder}
      <Alert
        description={"Xóa đoạn chat"}
        open={showAlert}
        onCancel={handleCancelModal}
        onOk={handleAcceptDelete}
      />
      <HeaderPage title="Lịch sử thanh toán" />
      <Space className={cx("filter")} align="center">
        <FormInfo form={filter} listInfo={filters} />
      </Space>
      <div className={cx("table")}>
        <AntdTableCustom
          loading={loading}
          columns={columns as any}
          rowKey={(record) => record.uid}
          dataSource={listChat}
          pagination={{
            total: listChat?.length,
            showSizeChanger: false,
          }}
          size="small"
        />
      </div>
    </>
  );
}
