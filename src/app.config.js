export default {
  cloud: true,
  pages: ["pages/index/index"],
  subpackages: [
    {
      root: "pages/list",
      pages: ["index"],
    },
    {
      root: "pages/about",
      pages: ["index"],
    },
    {
      root: "pages/detail",
      pages: ["index"],
    },
    {
      root: "pages/webview",
      pages: ["index"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "sRect的个人博客",
    navigationBarTextStyle: "black",
  },
  usingComponents: {
    wemark: "./components/wemark/wemark",
  },
};
