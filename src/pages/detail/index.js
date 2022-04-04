import { useContext, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Context } from "@/src/store";
import "./index.css";

/* global MD_CLOUD_PATH */

const Detail = () => {
  const { listPageData } = useContext(Context);
  const [mdStr, setMdStr] = useState("");
  const router = useRouter();

  // 链接复制
  const onMyEvent = (e) => {
    console.log(e);
    if (
      e.detail &&
      e.detail.currentTarget &&
      e.detail.currentTarget.dataset &&
      e.detail.currentTarget.dataset.url
    ) {
      const str = e.detail.currentTarget.dataset.url;

      Taro.setClipboardData({
        data: str,
        success() {
          Taro.showToast({
            title: "链接复制成功",
            icon: "success",
          });
        },
      });
    }
  };

  // useReady(() => {
  //   setTimeout(() => {
  //     Taro.createSelectorQuery()
  //       .select(".markdown-body")
  //       .node((res) => {
  //         console.log("==>");
  //         console.log(res);
  //       })
  //       .exec();
  //   }, 1500);
  // });

  useEffect(() => {
    if (!listPageData.filename && !router.params.filename) {
      Taro.hideLoading();
      return;
    }

    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    // Taro.cloud.downloadFile({
    //   fileID: `${MD_CLOUD_PATH}${listPageData.filename}.md`,
    //   success: (res) => {
    //     const fs = Taro.getFileSystemManager();

    //     if (!res.tempFilePath) return;

    //     fs.readFile({
    //       filePath: res.tempFilePath,
    //       encoding: "utf8",
    //       success: (readFileRes) => {
    //         console.log(readFileRes);
    //         const str = readFileRes.data;
    //         const matterResult = matter(str);

    //         console.log(matterResult);
    //       },
    //       fail: (readFileErr) => {
    //         console.log(readFileErr);

    //         Taro.hideLoading();
    //       },
    //       complete() {
    //         Taro.hideLoading();
    //       },
    //     });
    //   },
    //   fail(err) {
    //     console.log(err);
    //     Taro.hideLoading();
    //   },
    // });

    Taro.cloud
      .callFunction({
        // 要调用的云函数名称
        name: "add",
        // 传递给云函数的event参数
        data: {
          fileID: `${MD_CLOUD_PATH}${
            router.params.filename || listPageData.filename
          }.md`,
        },
      })
      .then(async (res) => {
        // output: res.result === 3
        console.log("res==>", res);
        const { result } = res;

        // https://github.com/wataru-chocola/remark-extended-table
        // const processedContent = await remark()
        //   .use(html)
        //   // .use(remarkParse)
        //   // .use(remarkGfm)
        //   // .use(remarkExtendedTable)
        //   // .use(remarkRehype, null, {
        //   //   handlers: Object.assign({}, extendedTableHandlers),
        //   // })
        //   // .use(rehypeStringify)
        //   .process(result.content);

        // const contentHtml = processedContent.toString();

        setMdStr(result.content);

        Taro.setNavigationBarTitle({
          title: (result.data && result.data.title) || "文章详情",
        });

        setTimeout(() => {
          Taro.hideLoading();
        }, 1000);
      })
      .catch((err) => {
        // handle error
        console.log(err);
        Taro.hideLoading();
      });
  }, [listPageData.filename, router.params.filename]);

  // useEffect(() => {
  //   const el = document.getElementById("md");
  //   function testOnTap(event) {}

  //   el.addEventListener("tap", testOnTap);

  //   return () => {
  //     el.removeEventListener("tap", testOnTap);
  //   };
  // }, []);

  return (
    <View id="md" className="markdown-body">
      <wemark
        id="wemark"
        md={mdStr}
        link
        highlight
        type="wemark"
        onMyEvent={onMyEvent}
      />
    </View>
  );
};

export default Detail;
