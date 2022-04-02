const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { nanoid } = require("nanoid");
// const html = require("remark-html");
// const {
//   remarkExtendedTable,
//   extendedTableHandlers,
// } = require("remark-extended-table");
// const remarkParse = require("remark-parse");
// const remarkRehype = require("remark-rehype");
// const rehypeStringify = require("rehype-stringify");
// const remarkGfm = require("remark-gfm");

const publicRoot = path.join(process.cwd(), "public");

const getTimeStamp = (date) => new Date(date).getTime();

// 获取文件列表信息
async function getAllPostIds() {
  const fileNames = fs.readdirSync(`${publicRoot}/md`);

  const result = fileNames.map((fileName) => {
    const fullPath = path.join(`${publicRoot}/md`, fileName);
    const matterResult = matter.read(fullPath);

    const { data } = matterResult;

    return {
      id: nanoid(),
      ...data,
      keywords: data.keywords.split(","),
      fileName: fileName.replace(/\.md$/, ""),
    };
  });

  const sortArr = result.sort(function (a, b) {
    return getTimeStamp(a.date) - getTimeStamp(b.date);
  });

  return sortArr.reverse();
}

// // 文件详情
// async function getPostData(id) {
//   const fullPath = path.join(mdRoot, `${id}.md`);

//   // const fileContents = fs.readFileSync(fullPath, "utf8");
//   // const matterResult = matter(fileContents);

//   const matterResult = matter.read(fullPath);

//   // https://github.com/wataru-chocola/remark-extended-table
//   const processedContent = await remark()
//     .use(html)
//     .use(remarkParse)
//     .use(remarkGfm)
//     .use(remarkExtendedTable)
//     .use(remarkRehype, null, {
//       handlers: Object.assign({}, extendedTableHandlers),
//     })
//     .use(rehypeStringify)
//     .process(matterResult.content);

//   const contentHtml = processedContent.toString();

//   return {
//     id,
//     contentHtml,
//     ...matterResult.data,
//   };
// }

(async function () {
  if (process.env.GEN_TYPE_ENV === "json") {
    const allPostIds = await getAllPostIds();
    // console.log(JSON.stringify(allPostIds));

    const writerStream = fs.createWriteStream(`${publicRoot}/json/list.json`);
    writerStream.write(`{"list": ${JSON.stringify(allPostIds)}}`, "utf8");
    writerStream.end();
    writerStream.on("finish", function () {
      console.log("json generate suceess");
    });

    writerStream.on("error", function (err) {
      console.error(err.stack);
    });
  }
})();
