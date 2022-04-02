const { Buffer } = require("buffer");
const cloud = require("wx-server-sdk");
const matter = require("gray-matter");

// const remark = require("remark");
// const html = require("remark-html");
// const {
//   remarkExtendedTable,
//   extendedTableHandlers,
// } = require("remark-extended-table");
// const remarkParse = require("remark-parse");
// const remarkRehype = require("remark-rehype");
// const rehypeStringify = require("rehype-stringify");
// const remarkGfm = require("remark-gfm");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

exports.main = async (event, context) => {
  console.log("event.fileID==>", event.fileID);
  const res = await cloud.downloadFile({
    fileID: event.fileID,
  });

  const str = Buffer.from(res.fileContent).toString();
  const matterResult = matter(str);

  // // https://github.com/wataru-chocola/remark-extended-table
  // const processedContent = await remark()
  //   .use(html)
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .use(remarkExtendedTable)
  //   .use(remarkRehype, null, {
  //     handlers: Object.assign({}, extendedTableHandlers),
  //   })
  //   .use(rehypeStringify)
  //   .process(matterResult.content);

  // const contentHtml = processedContent.toString();

  return matterResult;
};
