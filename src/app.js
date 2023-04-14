import React, { useEffect } from "react"; // eslint-disable-line
import { SafeArea } from "@taroify/core";
import { useImmerReducer } from "use-immer";

// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import Taro, { useDidShow, useDidHide } from "@tarojs/taro";

// 假设我们要使用 Redux
// import { Provider } from "react-redux";
// import configStore from "./store";

import { reducers, states, Context } from "@/src/store";
// import "antd-mobile/es/global/css-vars-patch.css";
// import "antd-mobile/bundle/style.css";
// 全局样式
import "./app.less";

// const store = configStore();

/* global CLOUD_ENV */

function App(props) {
  const { counterReducer, listPageReducer } = reducers;
  const { contData, listData } = states;
  const [contObj, dispatchCount] = useImmerReducer(counterReducer, contData);
  const [listPageData, dispatchPageData] = useImmerReducer(
    listPageReducer,
    listData
  );

  // 可以使用所有的 React Hooks
  useEffect(() => {
    Taro.cloud.init({
      env: CLOUD_ENV,
    });
  }, []);

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
    <Context.Provider
      value={{ contObj, dispatchCount, listPageData, dispatchPageData }}
    >
      <SafeArea position="top" />
      {/* props.children 是将要被渲染的页面 */}
      {props.children}
      <SafeArea position="bottom" />
    </Context.Provider>
  );
}

export default App;
