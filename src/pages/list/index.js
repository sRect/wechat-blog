import { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import {
  List as AntdList,
  Skeleton,
  PullToRefresh,
  Tag,
  Space,
  // Toast,
  ErrorBlock,
  Divider,
} from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import styles from "./List.module.less";

const PULL_REFRESH_STATUS = {
  pulling: "用力拉",
  canRelease: "松开吧",
  refreshing: "玩命加载中...",
  complete: "加载完成",
};

const tagColors = ["default", "primary", "success", "warning", "danger"];

const ARTICLE_LIST = [
  {
    id: "hLI4M8yOn6FAhtgJBwj_s",
    title: "3分钟使用Hexo搭建自己的博客",
    keywords: ["hexo", " docker", " github actions"],
    date: "2022-3-24",
    fileName: "hexo-blog",
  },
  {
    id: "IMMGWFbUaF9mR2MD_eZch",
    title: "多图超详细 jenkins 容器安装并部署前端项目",
    keywords: ["jenkins", " docker"],
    date: "2022-03-08",
    fileName: "jenkins-docker",
  },
  {
    id: "Xy5zJ_NkqT51QD-voEnLd",
    title: "打造一个保存掘金文章的 cli",
    keywords: ["cli", " puppeteer"],
    date: "2022-02-18",
    fileName: "mycli",
  },
  {
    id: "53rrzawqrSvTmgWFImRjG",
    title: "超详细手摸手带你docker-compose + portainer部署你的todolist小应用",
    keywords: [
      "Portainer",
      " Docker",
      " docker-compose",
      " github Actions",
      " CI",
    ],
    date: "2022-01-29",
    fileName: "portainer",
  },
  {
    id: "MSyCw5DzWCDqk8rb6ynPQ",
    title: "使用 Next.js + Docker 打造一个属于你的私人博客",
    keywords: ["Next.js", " Docker", " github Actions", " CI", " CD"],
    date: "2022-01-08",
    fileName: "nextjs-blog",
  },
  {
    id: "e886O5FOKVEuXOhfQuOH4",
    title: "content-encoding: br 是什么编码格式？",
    keywords: ["nginx", " br"],
    date: "2021-12-23",
    fileName: "br",
  },
  {
    id: "LamSexWBxyxFGqYZCNzlw",
    title: "微信小程序持续获取定位测试",
    keywords: ["微信小程序", " Tarojs"],
    date: "2021-11-03",
    fileName: "location",
  },
  {
    id: "jB_HbbvIdUU_oTEXI29NA",
    title: "微前端qiankun上手体验",
    keywords: ["微前端", " single-spa", " qiankun"],
    date: "2021-02-25",
    fileName: "qiankun",
  },
  {
    id: "4Kp5spOUWq1cJvq7hHZJY",
    title: "redux toolkit 的使用",
    keywords: ["react", " redux", " @reduxjs/toolkit"],
    date: "2020-10-09",
    fileName: "redux-toolkit",
  },
  {
    id: "wdt5Su7_K4Cr89VLz6nds",
    title: "When to Use Static Generation v.s. Server-side Rendering",
    keywords: ["Static Generatio", " Server-side Rendering"],
    date: "2020-01-02",
    fileName: "ssg-ssr",
  },
  {
    id: "edifBfLsni7upjYYfLrA_",
    title: "Two Forms of Pre-rendering",
    keywords: ["Pre-rendering"],
    date: "2020-01-01",
    fileName: "pre-rendering",
  },
];

const List = () => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [pageList, setPageList] = useState([]);

  // const handleRefresh = async () => {
  //   try {
  //     const data = await fetch("/api/article/list", { method: "POST" }).then(
  //       (res) => res.json()
  //     );

  //     setPageList(data?.data || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setPageList(ARTICLE_LIST);

    setTimeout(() => {
      setSkeletonLoading(false);
    }, 20);
  }, []);

  return (
    <View className={styles.wrapper}>
      {skeletonLoading ? (
        <Skeleton.Paragraph lineCount={20} animated />
      ) : (
        <PullToRefresh
          onRefresh={async () => {
            await sleep(200);
            // await handleRefresh();
          }}
          renderText={(status) => {
            return <View>{PULL_REFRESH_STATUS[status]}</View>;
          }}
        >
          {pageList.length ? (
            <AntdList>
              {pageList.map((item) => {
                return (
                  <View key={item.id}>
                    <AntdList.Item
                      clickable
                      onClick={() => console.log("goto detail")}
                      arrow={
                        <View
                          className={`${styles.arrow} ${styles.arrowRight}`}
                        />
                      }
                      description={
                        <>
                          <View style={{ margin: "6px 0" }}>
                            <Space>
                              {item.keywords.map((keywords, index) => (
                                <Tag
                                  color={
                                    tagColors[Math.floor(Math.random() * 6)]
                                  }
                                  key={index}
                                >
                                  {keywords}
                                </Tag>
                              ))}
                            </Space>
                          </View>
                          <Text>{item.date}</Text>
                        </>
                      }
                    >
                      {item.title}
                    </AntdList.Item>
                    <Divider
                      style={{
                        color: "#eee",
                        borderColor: "#eee",
                        margin: 0,
                      }}
                    />
                  </View>
                );
              })}
            </AntdList>
          ) : (
            <ErrorBlock status="default" title="暂无数据" description={" "} />
          )}
        </PullToRefresh>
      )}
    </View>
  );
};

export default List;
