import { useContext, useState } from "react";
import { View } from "@tarojs/components";
import { useLoad, getAccountInfoSync } from "@tarojs/taro";
import { Image, Space, Button, Cell, ConfigProvider } from "@taroify/core";
import { actions, Context } from "@/src/store";
import ABOUT_PNG from "@/src/assets/img/gzh_qrcode.jpg";
import styles from "./About.module.less";

function UseImmerReducer() {
  const { increment, decrement } = actions;
  const { contObj, dispatchCount } = useContext(Context);

  const [version, setVersion] = useState("");

  useLoad(() => {
    const accountInfo = getAccountInfoSync();
    setVersion(accountInfo.miniProgram.version);
  });

  return (
    <ConfigProvider
      theme={{
        cellFontSize: "16px",
      }}
    >
      <View className={styles.wrap}>
        <View style={{ textAlign: "center" }}>
          <Image
            src={ABOUT_PNG}
            style={{ width: "12rem", height: "12rem" }}
            alt="about"
            show-menu-by-longpress
          />
          <View style={{ fontSize: "12px", color: "#666" }}>
            长按识别关注公众号
          </View>
        </View>

        <View>
          <Cell title="当前版本">{version}</Cell>
          <Cell
            title="Context Api + useImmerReducer的使用"
            brief={"num:" + contObj.num}
          >
            <Space justify="end">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => dispatchCount(increment(1))}
              >
                add
              </Button>
              <Button
                color="danger"
                size="small"
                onClick={() => dispatchCount(decrement(1))}
              >
                minus
              </Button>
            </Space>
          </Cell>
        </View>
      </View>
    </ConfigProvider>
  );
}

export default UseImmerReducer;
