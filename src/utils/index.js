import Taro from "@tarojs/taro";

/* global MD_DIR_PATH */
export function getList() {
  const fs = Taro.getFileSystemManager();

  // 判断目录是否存在
  fs.access({
    path: MD_DIR_PATH,
    success() {
      // 读取目录
      fs.readdir({
        dirPath: MD_DIR_PATH,
        success(res) {
          console.log(res);
          const files = res.files;

          if (files && Array.isArray(files)) {
            files.map((fileName) => {
              const fullPath = MD_DIR_PATH + fileName;

              // fs.readFile({
              //   filePath: fullPath,
              //   success(readFileRes) {
              //     console.log(readFileRes)
              //   },
              //   fail(readFileErr) {
              //     console.log(readFileErr);
              //   }
              // })

              fs.copyFile({
                srcPath: fullPath,
                destPath: Taro.env.USER_DATA_PATH + "/md/" + fileName,
                success(copyFileRes) {
                  console.log(copyFileRes);
                },
                fail(copyFileErr) {
                  console.error(copyFileErr);
                },
              });
            });
          }
        },
        fail(err) {
          console.log(err);
        },
      });
    },
  });
}
