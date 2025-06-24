import { Image, message, Space, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./Login.module.css";
import { useForm } from "antd/es/form/Form";
import logo from "../../assets/images/logo.png";
import AntdButtonCustom from "../../components/AntdButtonCustom";
import FormInfo from "../../components/FormInfo";
import userIcon from "../../assets/icons/person.svg";
import lockIcon from "../../assets/icons/lock.svg";
import { ResponeLogin, UserInfo } from "../../types/login";
import { authApi } from "../../api/auth";
const { Title } = Typography;

const cx = classNames.bind(styles);

export default function Login() {
  const [formLogin] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const listInfo = [
    {
      // label: "Tên đăng nhập",
      type: "input",
      name: "username",
      span: 24,
      placeholder: "Tên đăng nhập",
      rules: [{ required: true, message: "Vui lòng nhập tên đăng nhập" }],
      prefix: <Image height={24} src={userIcon} preview={false} />,
    },
    {
      // label: "Mật khẩu",
      type: "password",
      name: "password",
      span: 24,
      placeholder: "Mật khẩu",
      rules: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
      prefix: <Image height={24} src={lockIcon} preview={false} />,
    },
  ];
  const handleLogin = async () => {
    try {
      await formLogin.validateFields();
      const info: UserInfo = {
        username: formLogin.getFieldValue("username"),
        password: formLogin.getFieldValue("password"),
      };
      const response = await authApi.login(info);
      const respone: ResponeLogin[] = response.data;

      if (respone && respone?.length > 0) {
        localStorage.setItem("token", respone[0]?.createdAt);
        localStorage.setItem("id", respone[0]?.id);
        localStorage.setItem("username", respone[0]?.username);
        localStorage.setItem("name", respone[0]?.name);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      if (error?.errorFields) {
        formLogin.setFields(error.errorFields);
      } else {
        console.log(error);
        messageApi.error(error?.response?.data?.detail || "Có lỗi xảy ra");
      }
    }
  };

  return (
    <div className={cx("login-container")}>
      {contextHolder}
      <Space
        direction="vertical"
        size={"small"}
        className={cx("login-space")}
        align="center"
      >
        <Title level={4} className={cx("title")}>
          Dashboard
        </Title>
        <img className={cx("logo")} src={logo} alt="Logo" />

        <FormInfo form={formLogin} listInfo={listInfo} gutter={[0, 0]} />
        <AntdButtonCustom
          type="primary"
          className={cx("login-button")}
          onClick={handleLogin}
        >
          Đăng nhập
        </AntdButtonCustom>
      </Space>
    </div>
  );
}
