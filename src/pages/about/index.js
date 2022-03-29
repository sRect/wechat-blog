import { useContext } from "react";
import { View, Text, Button } from "@tarojs/components";
import { Image, Space } from "antd-mobile";
import { actions, Context } from "@/src/store";
import ABOUT_PNG from "@/src/assets/img/test2.png";
import "./index.less";

function UseImmerReducer() {
  const { increment, decrement } = actions;
  const { contObj, dispatchCount } = useContext(Context);

  return (
    <View className="index">
      <Image
        className="about"
        width={240}
        height={240}
        src={ABOUT_PNG}
        alt="about"
      />

      <View>
        <View>
          <Text>Context Api + useImmerReducer的使用</Text>
        </View>
        <Text>num: {contObj.num}</Text>
      </View>

      <Space wrap align="center">
        <Button size="mini" onClick={() => dispatchCount(increment(1))}>
          add
        </Button>
        <Button
          size="mini"
          type="warn"
          onClick={() => dispatchCount(decrement(1))}
        >
          minus
        </Button>
      </Space>
    </View>
  );
}

export default UseImmerReducer;
