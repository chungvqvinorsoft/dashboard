import { Spin, Table, TableProps } from "antd";
import { createStyles, FullToken } from "antd-style";
import React from "react";
import classNames from "classnames/bind";
import styles from "./AntdTableCustom.module.css";

const cx = classNames.bind(styles);
// interface FullToken extends AntdToken, CustomToken {}
interface AntdTableCustomProps extends TableProps {
  loading: boolean;
}
const useStyle = createStyles(
  ({ css, token }: { css: any; token: FullToken }) => {
    const prefixCls = "ant"; // Default Ant Design class prefix
    return {
      customTable: css`
        .${prefixCls}-table {
          .${prefixCls}-table-container {
            .${prefixCls}-table-body, .${prefixCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
              overflow-y: auto;
              overflow-x: auto;
            }
            .${prefixCls}-table-body::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .${prefixCls}-table-body::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 4px;
            }
            .${prefixCls}-table-body::-webkit-scrollbar-track {
              background-color: transparent;
            }
          }
        }
      `,
    };
  }
);

function AntdTableCustom({ loading, ...props }: AntdTableCustomProps) {
  const { styles } = useStyle();
  return (
    <Table
      {...props}
      loading={{
        indicator: (
          <div>
            <Spin />
          </div>
        ),
        spinning: loading,
      }}
      className={styles.customTable}
      pagination={{
        ...props.pagination,
        position: ['bottomCenter']
      }}
    />
  );
}

export default AntdTableCustom;
