import { useState, useEffect, useContext } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  List as AntdList,
  Skeleton,
  Tag,
  Space,
  // Toast,
  ErrorBlock,
  Divider,
} from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { actions, Context } from "@/src/store";
import styles from "./List.module.less";

const tagColors = ["default", "primary", "success", "warning", "danger"];

/* global JSON_CLOUD_PATH */

const List = () => {
  const { setFilename, setListScrollTop } = actions;
  const { dispatchPageData } = useContext(Context);

  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [pageList, setPageList] = useState([]);

  const [scrollTop, setScrollTop] = useState(0);
  const [refresherTriggered, setRefresherTriggered] = useState(false);

  // 列表刷新
  const handleRefresh = (cb) => {
    Taro.cloud.downloadFile({
      fileID: JSON_CLOUD_PATH,
      success: (res) => {
        const fs = Taro.getFileSystemManager();

        if (!res.tempFilePath) return;

        fs.readFile({
          filePath: res.tempFilePath,
          encoding: "utf8",
          success: (readFileRes) => {
            const objStr = readFileRes.data;
            const obj = (objStr && JSON.parse(objStr)) || {};
            const list = obj.list || [];

            setPageList(list);

            cb && cb();
          },
          fail: (readFileErr) => {
            console.log(readFileErr);

            Taro.showToast({
              title: "列表加载异常",
              icon: "error",
              mask: true,
            });
          },
          complete() {
            setSkeletonLoading(false);
          },
        });
      },
      fail(err) {
        console.log(err);
        setSkeletonLoading(false);
        setPageList([]);

        Taro.showToast({
          title: "列表加载异常",
          icon: "error",
          mask: true,
        });
      },
    });
  };

  const handleGotoDetail = (data) => {
    const { fileName } = data;

    dispatchPageData(setListScrollTop(scrollTop));
    dispatchPageData(setFilename(fileName));

    Taro.navigateTo({
      url: "/pages/detail/index",
    });
  };

  useEffect(() => {
    setSkeletonLoading(true);

    handleRefresh();
  }, []);

  return (
    <View className={styles.wrapper}>
      {skeletonLoading ? (
        <Skeleton.Paragraph lineCount={20} animated />
      ) : (
        <ScrollView
          className="scrollview"
          scrollY
          scrollX={false}
          scrollTop={scrollTop}
          style={{ height: "100vh" }}
          enableBackToTop
          scrollWithAnimation
          refresherEnabled
          refresherThreshold={40}
          refresherBackground="#cccccc"
          refresherTriggered={refresherTriggered}
          onScroll={({ scrollTop: scrollTopNum }) => setScrollTop(scrollTopNum)}
          onScrollToLower={() => console.log("到底了")}
          onRefresherRefresh={() => {
            setRefresherTriggered(true);

            handleRefresh(async () => {
              await sleep(1500);
              setRefresherTriggered(false);
            });
          }}
          onRefresherRestore={() => {
            console.log("onRefresherRestore");
          }}
          onRefresherAbort={() => {
            console.log("onRefresherAbort");
          }}
        >
          {pageList.length ? (
            <AntdList>
              {pageList.map((item) => {
                return (
                  <View key={item.id}>
                    <AntdList.Item
                      clickable
                      onClick={() => handleGotoDetail(item)}
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
        </ScrollView>
      )}
    </View>
  );
};

export default List;
