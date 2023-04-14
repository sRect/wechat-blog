#!/usr/bin/env node
const path = require("path");
const os = require("os");
const { stat, mkdir } = require("fs");
const automator = require("miniprogram-automator");
const argv = process.argv.slice(2);
const rootDir = process.cwd();
// const pagesJson = require(path.resolve(__dirname, "../src/pages.json"));

console.log("platform==>", os.platform());
console.log("miniprogram argv==>", argv);

const projectPath = path.resolve(rootDir, `./dist`);
const cliPath =
  os.platform() === "win32"
    ? "C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat"
    : "/Applications/wechatwebdevtools.app/Contents/MacOS/cli";

function openMiniProgram() {
  // developers.weixin.qq.com/miniprogram/dev/devtools/auto/automator.html
  // cliPath 未设置时将会在以下几个位置尝试寻找：
  // Mac：/Applications/wechatwebdevtools.app/Contents/MacOS/cli
  // Win：C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat
  automator
    .launch({
      // port: 49582,
      cliPath: cliPath, // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
      // projectPath: `/Users/fangchaoqun/pro/net_hospital_minapp_web/dist/${argv[0]}/mp-weixin`, // 项目文件地址
      projectPath: projectPath, // 项目文件地址
    })
    .then((miniProgram) => {
      console.log("启动微信开发者工具中，请耐心等待...");
      const homeFilePath = path.relative(projectPath, "./pages/index/index");
      stat(homeFilePath, async (err) => {
        if (err) {
          return process.exit();
        }

        const page = await miniProgram.navigateTo(`/pages/index/index`);
        // await page.waitFor(500);
        // const element = await page.$(".kind-list-item-hd");
        // console.log(await element.attribute("class"));
        // await element.tap();

        // await miniProgram.close();
        console.log("启动微信开发者工具成功");
        process.exit();
      });
    })
    .catch((err) => {
      console.log("微信开发者工具打开异常，请尝试手动打开项目");
      console.error(err);
      process.exit();
    });
}

stat(projectPath, (err, stats) => {
  if (err) {
    console.log("文件夹不存在，即将创建");
    mkdir(projectPath, { recursive: true }, (e) => {
      if (e) throw e;

      openMiniProgram();
    });

    return;
  }

  if (stats.isDirectory()) {
    console.log("文件夹存在，直接打开");
    openMiniProgram();
  }
});
