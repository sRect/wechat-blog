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
// import pageListJson from "@/public/json/list.json";
import styles from "./List.module.less";

const tagColors = ["default", "primary", "success", "warning", "danger"];

const List = () => {
  const { setFilename, setListScrollTop } = actions;
  const { dispatchPageData } = useContext(Context);

  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [pageList, setPageList] = useState([]);

  const [scrollTop, setScrollTop] = useState(0);
  const [refresherTriggered, setRefresherTriggered] = useState(false);

  // 列表刷新
  const handleRefresh = (cb) => {
    import("@/assets/json/list.json")
      .then((res) => {
        setPageList(res.default.list);

        cb && cb();
      })
      .catch(() => {
        Taro.showToast({
          title: "列表加载异常",
          icon: "error",
          mask: true,
        });
      })
      .finally(() => {
        setSkeletonLoading(false);
      });
  };

  const handleGotoDetail = (data) => {
    const { fileName } = data;

    dispatchPageData(setListScrollTop(scrollTop));
    dispatchPageData(setFilename(fileName));

    Taro.navigateTo({
      url: "/pages/detail/index?filename=" + fileName,
    });
  };

  useEffect(() => {
    setSkeletonLoading(true);

    handleRefresh();
  }, []);

  return (
    <View className={styles.wrapper}>
      {skeletonLoading ? (
        <Skeleton.Paragraph lineCount={50} animated />
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
              Taro.showToast({
                title: "刷新成功",
                icon: "none",
                mask: true,
              });
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
                      className={styles.listItem}
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
