import {
  Col,
  DatePicker,
  Form,
  FormInstance,
  FormItemProps,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  SpaceProps,
} from "antd";
import styles from "./FormInfo.module.css";
import classNames from "classnames/bind";
import TextArea from "antd/es/input/TextArea";
import { Fragment } from "react";
const cx = classNames.bind(styles);

// linfo item
//  {
//             label: 'Biển số xe',
//             type: "input",
//             name: "licensePlate",
//             span: 24,
//             placeholder: "Vd: 29-F1/123.45",
//             rules: [{ required: true, message: 'Vui lòng nhập biển số xe' }],
//         },
interface FormInfoProps {
  form: FormInstance;
  listInfo: Array<any>;
  gutter?: [number, number];
  direction?: "vertical" | "horizontal";
  directionProps?: SpaceProps;
  formItemProps?: FormItemProps;
}

function FormInfo({
  form,
  listInfo = [],
  gutter = [8, 8],
  formItemProps = {},
  direction = "vertical",
  directionProps = {},
}: FormInfoProps) {
  const Direction = direction === "vertical" ? Fragment : Space;
  const render = (formItem: any) => {
    const { hide, type, label, span, ...props } = formItem;
    if (hide) {
      return <></>;
    } else {
      switch (type) {
        case "input":
          return <Input className={cx("info-item", "input")} {...props} />;
        case "password":
          return <Input.Password className={cx("info-item", "input")} {...props}  />;
        case "inputNumber":
          return (
            <InputNumber
              className={cx("info-item", "input", `${props?.align}`)}
              {...props}
              type="number"
            />
          );
        case "textArea":
          return <TextArea className={cx("info-item", "input")} {...props} />;
        case "select":
          return (
            <Select
              className={cx("info-item", "select")}
              {...props}
              placeholder={"Tất cả"}
              // notFoundContent={<></>}
            />
          );
        case "autocomplete":
          return (
            <Select
              className={cx("info-item", "select")}
              {...props}
              placeholder={"Tất cả"}
              // notFoundContent={<></>}
            />
          );
        case "datepicker":
          return (
            <DatePicker className={cx("info-item", "datepicker")} {...props} />
          );
        case "slider":
          return (
            <Slider
              className={cx("info-item", "slider")}
              {...props}
              tooltip={{ open: true }}
            />
          );
        case "inputNumberDf":
          return (
            <input
              className={cx(
                "info-item",
                "input",
                `${props?.align}`,
                "input-default"
              )}
              {...props}
              type="number"
            />
          );
        case "radio":
          return (
            <Radio.Group className={cx("info-item", "radio")} {...props} />
          );
        default:
          return <></>;
      }
    }
  };
  return (
    <Form form={form} className={cx('form')}>
      <Row gutter={gutter}>
        {listInfo?.map((formItem, index) => {
          return (
            <Col
              span={formItem?.hide ? 0 : formItem?.span}
              key={`${formItem?.name}_${index}`}
            >
              <Direction {...directionProps}>
                {!formItem?.hide && (
                  formItem?.label && <p className={cx("label")}>{formItem?.label}</p>
                )}
                {!formItem?.hide ? (
                  <Form.Item
                    name={formItem?.name}
                    rules={formItem?.rules}
                    {...formItemProps}
                  >
                    {render(formItem)}
                  </Form.Item>
                ) : (
                  <></>
                )}
              </Direction>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
}

export default FormInfo;
