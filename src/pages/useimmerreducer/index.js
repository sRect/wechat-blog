import { useContext } from "react";
import { View, Text, Button } from "@tarojs/components";
import { actions, Context } from "@/src/store";
import "./index.less";

function UseImmerReducer() {
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

export default UseImmerReducer;
