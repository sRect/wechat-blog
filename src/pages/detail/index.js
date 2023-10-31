import { useContext, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Context } from "@/src/store";
import "./index.css";

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

  // 复制代码
  const onMyevent2 = (e) => {
    console.log(e);
    if (
      e &&
      e.mpEvent.detail.target &&
      e.mpEvent.detail.target.dataset &&
      e.mpEvent.detail.target.dataset.code
    ) {
      let code = e.mpEvent.detail.target.dataset.code;
      console.log("code", code);

      if (typeof code === "string") {
        Taro.setClipboardData({
          data: code,
          fail: (err) => {
            console.log(err);
            Taro.showToast({
              title: "复制失败",
              icon: "error",
            });
          },
        });
      } else if (typeof code === "object" && Array.isArray(code)) {
        let str = "";
        code.forEach((v) => {
          if (v && typeof v === "object") {
            str += v.content;
          } else {
            str += v;
          }
        });

        Taro.setClipboardData({
          data: str,
          fail: (err) => {
            console.log(err);
            Taro.showToast({
              title: "复制失败",
              icon: "error",
            });
          },
        });
      }
    }
  };

  // 在公众号中打开查看
  const gotoWebview = e => {
    console.log(e);
    if(!e) return;

    Taro.navigateTo({
      url: `/pages/webview/index?path=${encodeURIComponent(e.detail)}`,
    });
  }

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
        // userselect={userselect}
        link
        highlight
        type="wemark"
        onMyevent={onMyEvent}
        onRenderend={() => {
          console.log("onRenderend");
          Taro.hideLoading();
        }}
        onMyevent2={onMyevent2}
        onMyevent3={gotoWebview}
      />
    </View>
  );
};

export default Detail;
