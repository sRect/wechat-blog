const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssvartolessvar = require("postcss-css-var-to-less-var");
const shell = require("shelljs");

const distRoot = path.join(process.cwd(), "./dist");
const fromWxssFilePath = path.resolve(distRoot, "./common.wxss");
const destLessFilePath = path.resolve(distRoot, "./common-my.less");
const destCssFilePath = path.resolve(distRoot, "./common-my.css");

(function () {
  fs.readFile(path.resolve(distRoot, "./common.wxss"), (err, css) => {
    if (err) {
      console.log("读取common.wxss错误", err);
      return;
    }

    postcss([cssvartolessvar])
      .process(css, { from: fromWxssFilePath, to: destLessFilePath })
      .then((result) => {
        fs.writeFile(destLessFilePath, result.css, "utf8", (err) => {
          if (err) {
            console.error("css变量转less变量，写入失败");
            return;
          }

          console.log("css变量转less变量成功，写入成功");
          console.log("开始将less转为css");
          shell.exec(`npx lessc ${destLessFilePath} ${destCssFilePath}`);
        });
        // if (result.map) {
        //   fs.writeFile("dest/app.css.map", result.map.toString(), () => true);
        // }
      });
  });
})();
