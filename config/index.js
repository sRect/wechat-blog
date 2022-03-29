const path = require("path");

const config = {
  projectName: "wechat-blog",
  date: "2022-3-28",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  alias: {
    "@/src": path.resolve(__dirname, "../src"),
  },
  plugins: [
    [
      "@tarojs/plugin-html",
      {
        // 过滤 antd 组件库的前缀：am-
        pxtransformBlackList: [/adm-/, /am-/, /^body/],
      },
    ],
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    // 用于控制是否生成 js、css 对应的 sourceMap
    enableSourceMap: process.env.NODE_ENV === "development",
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/adm-/, /am-/],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      // https://taro-docs.jd.com/taro/docs/css-modules
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    lessLoaderOption: {
      lessOptions: {
        strictMath: true,
        noIeCompat: true,
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
