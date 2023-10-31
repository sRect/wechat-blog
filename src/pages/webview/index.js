import {memo, useState, useEffect} from "react";
import { WebView } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

const MyWebview = () => {
  const [path, setPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    const url = decodeURIComponent(router.params.path);
    console.log("url:", router.params.path);
    setPath(url);
  }, [router.params.path]);

  return <WebView src={path} />;
}

export default memo(MyWebview);
