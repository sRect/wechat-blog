import React, { useEffect, createContext } from "react"; // eslint-disable-line
import { ConfigProvider, SafeArea } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { useImmerReducer } from "use-immer";

// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from "@tarojs/taro";

// 假设我们要使用 Redux
// import { Provider } from "react-redux";
// import configStore from "./store";

import { reducers, states } from "@/src/store";

// 全局样式
import "./app.less";

// const store = configStore();
export const Context = createContext({});

function App(props) {
  const { counterReducer } = reducers;
  const { contData } = states;
  const [contObj, dispatchCount] = useImmerReducer(counterReducer, contData);

  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
    <ConfigProvider locale={zhCN}>
      <Context.Provider value={{ contObj, dispatchCount }}>
        <SafeArea position="top" />
        {/* props.children 是将要被渲染的页面 */}
        {props.children}
        <SafeArea position="bottom" />
      </Context.Provider>
    </ConfigProvider>
  );
}

export default App;
