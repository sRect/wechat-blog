const fs = require("fs");
const path = require("path");
// const shell = require("shelljs");
const fsPromise = fs.promises;

const srcRoot = path.join(process.cwd(), "public/img");
const destRoot = path.join(process.cwd(), "dist/components/img");

async function copyImgFile() {
  try {
    await fsPromise.cp(srcRoot, destRoot, {
      force: true,
      recursive: true,
      errorOnExist: false,
    });
    // shell.cp("-R", srcRoot, path.join(process.cwd(), "src/components"));
    console.log("图片复制成功");
  } catch (error) {
    console.error(error);
  }
}

(async function () {
  try {
    const isExist = await fsPromise.stat(destRoot);

    if (isExist) {
      console.log("目标文件夹存在，进行删除");
      await fsPromise.rm(destRoot, { recursive: true, force: true });
      console.warn("目标文件夹删除成功，重新创建");
      await fsPromise.mkdir(destRoot);
      await copyImgFile();
    }
  } catch (error) {
    console.error(error);

    if (error.code === "ENOENT" && error.syscall === "stat") {
      console.warn("目标文件夹不存在，即将创建");
      try {
        await fsPromise.mkdir(destRoot);
        await copyImgFile();
      } catch (error) {
        console.error(error)
      }
    }

    process.exit(1);
  }
})();
