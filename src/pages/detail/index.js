import { useContext, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Context } from "@/src/store";
// import hljs from "highlight.js";

// import { remark } from "remark";
// import html from "remark-html";
// import {
//   remarkExtendedTable,
//   extendedTableHandlers,
// } from "remark-extended-table";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeStringify from "rehype-stringify";
// import remarkGfm from "remark-gfm";

// import "github-markdown-css/github-markdown.css";
// import "highlight.js/styles/github.css";
import "./index.css";

/* global MD_CLOUD_PATH */

const Detail = () => {
  const { listPageData } = useContext(Context);
  const [mdStr, setMdStr] = useState("");

  useEffect(() => {
    if (!listPageData.filename) {
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
          fileID: `${MD_CLOUD_PATH}${listPageData.filename}.md`,
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

        Taro.hideLoading();
      })
      .catch((err) => {
        // handle error
        console.log(err);
        Taro.hideLoading();
      });
  }, [listPageData.filename]);

  // useReady(() => {
  //   // https://developers.weixin.qq.com/community/develop/doc/000aa0f17a8af0e02d7c0ca5e56800
  //   const query = Taro.createSelectorQuery().in(this);

  //   query
  //     .select("#md")
  //     .node(function (res) {
  //       console.log("node==>", res);
  //     })
  //     .exec();
  // });

  return (
    <View id="md" className="markdown-body">
      <wemark md={mdStr} link highlight type="wemark" />
    </View>
  );
};

export default Detail;
