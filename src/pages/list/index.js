import { useState, useEffect, useContext } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  List as TaroList,
  Skeleton,
  ConfigProvider,
  Tag,
  Space,
  Cell,
} from "@taroify/core";
import { Arrow } from "@taroify/icons";
import { actions, Context } from "@/src/store";
import { sleep } from "@/src/utils/index";
// import pageListJson from "@/public/json/list.json";
import styles from "./List.module.less";

const tagColors = [
  "default",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
];

const List = () => {
  const { setFilename, setListScrollTop } = actions;
  const { dispatchPageData } = useContext(Context);

  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [pageList, setPageList] = useState([]);

  const [scrollTop, setScrollTop] = useState(0);
  const [refresherTriggered, setRefresherTriggered] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
        setHasMore(false);
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
    <ConfigProvider
      theme={{
        skeletonHeight: "100vh",
      }}
    >
      <View className={styles.wrapper}>
        {skeletonLoading ? (
          <Skeleton animation="wave" />
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
            onScroll={({ scrollTop: scrollTopNum }) =>
              setScrollTop(scrollTopNum)
            }
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
                setLoading(false);
              });
            }}
            onRefresherRestore={() => {
              console.log("onRefresherRestore");
            }}
            onRefresherAbort={() => {
              console.log("onRefresherAbort");
            }}
          >
            <TaroList
              loading={loading}
              hasMore={hasMore}
              onLoad={() => {
                setLoading(true);
              }}
            >
              <>
                {pageList.map((item) => {
                  return (
                    <Cell
                      key={item.id}
                      rightIcon={<Arrow />}
                      clickable
                      onClick={() => handleGotoDetail(item)}
                    >
                      <View className={styles.listItem}>
                        <Text className={styles.title}>{item.title}</Text>
                        <View>
                          <Space>
                            {item.keywords.map((keywords, index) => (
                              <Tag
                                shape="rounded"
                                key={index}
                                color={tagColors[Math.floor(Math.random() * 6)]}
                              >
                                {keywords}
                              </Tag>
                            ))}
                          </Space>
                        </View>
                        <Text className={styles.date}>{item.date}</Text>
                      </View>
                    </Cell>
                  );
                })}

                <TaroList.Placeholder>
                  {!hasMore && "没有更多了"}
                </TaroList.Placeholder>
              </>
            </TaroList>
          </ScrollView>
        )}
      </View>
    </ConfigProvider>
  );
};

export default List;
