import { useContext } from "react";
import { View, Text, Button } from "@tarojs/components";
import { actions } from "@/src/store";
import { Context } from "../../app";
import "./index.less";

function Index() {
  const { increment, decrement } = actions;
  const { contObj, dispatchCount } = useContext(Context);

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Text>num: {contObj.num}</Text>

      <Button onClick={() => dispatchCount(increment(1))}>add</Button>
      <Button onClick={() => dispatchCount(decrement(1))}>minus</Button>
    </View>
  );
}

export default Index;
