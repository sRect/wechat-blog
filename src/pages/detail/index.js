import { useContext, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Context } from "@/src/store";
import "./index.css";

const Detail = () => {
  const { listPageData } = useContext(Context);
  const [mdStr, setMdStr] = useState("");
  const router = useRouter();
  const userselect = true;

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

  useEffect(() => {
    if (!listPageData.filename && !router.params.filename) {
      Taro.hideLoading();
      return;
    }

    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });

    import(`@/assets/json/list.json`)
      .then((res) => {
        const list = res.default.list;

        const obj = list.find(
          (item) =>
            item.fileName === (router.params.filename || listPageData.filename)
        );

        console.log(obj);

        setMdStr(obj.content);

        Taro.setNavigationBarTitle({
          title: obj.title || "文章详情",
        });

        // setTimeout(() => {
        //   Taro.hideLoading();
        // }, 1000);
        // Taro.pageScrollTo({scrollTop: 0})
      })
      .catch((err) => {
        console.log(err);
        Taro.hideLoading();
      });
  }, [listPageData.filename, router.params.filename]);

  return (
    <View id="md" className="markdown-body">
      <wemark
        id="wemark"
        md={mdStr}
        userselect={userselect}
        link
        highlight
        type="wemark"
        onMyevent={onMyEvent}
        onRenderend={() => {
          console.log("onRenderend");
          Taro.hideLoading();
        }}
      />
    </View>
  );
};

export default Detail;
