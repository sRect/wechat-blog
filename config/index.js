const fs = require("fs");
const path = require("path");

// 读取 .env 文件
function getEnvConfig(vite_env_key) {
  const envFilePath = path.join(__dirname, "../.env");

  const existEnvFile = fs.statSync(envFilePath, { throwIfNoEntry: false });

  if (existEnvFile.size <= 0) return;

  const envContent = fs.readFileSync(envFilePath, "utf8");

  if (!envContent) return;

  const envContentArr = envContent
    .split("\n")
    .filter((str) => !str.startsWith("#")) // 过滤掉注释行
    .filter(Boolean);

  const resultKey = envContentArr.find((item) => item.includes(vite_env_key));

  return resultKey ? resultKey.split("=")[1] : null;
}

function getConf() {
  const CLOUD_ENV = getEnvConfig("CLOUD_ENV");
  const JSON_CLOUD_PATH = getEnvConfig("JSON_CLOUD_PATH");
  const MD_CLOUD_PATH = getEnvConfig("MD_CLOUD_PATH");

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
    defineConstants: {
      // markdown目录路径
      MD_DIR_PATH: '"assets/md/"',
      // 云存储ENV
      CLOUD_ENV: JSON.stringify(CLOUD_ENV),
      // 云存储json路径
      JSON_CLOUD_PATH: JSON.stringify(JSON_CLOUD_PATH),
      MD_CLOUD_PATH: JSON.stringify(MD_CLOUD_PATH),
    },
    copy: {
      patterns: [
        {
          from: "cloudbase/",
          to: "dist/cloudbase/",
        },
      ],
      options: {},
    },
    framework: "react",
    mini: {
      // 用于控制是否生成 js、css 对应的 sourceMap
      enableSourceMap: process.env.DEV_MODE_ENV === "true",
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

  return config;
}

module.exports = function (merge) {
  const config = getConf();

  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
