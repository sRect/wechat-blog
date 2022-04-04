const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {
    webpackChain(chain, webpack) {
      if (process.env.DEV_MODE_ENV === "true") {
        chain.plugin("analyzer").use(BundleAnalyzerPlugin, [], {
          openAnalyzer: true,
        });
      } else {
        chain.plugin("terser").use(TerserPlugin, [
          {
            exclude: ["../src/component/wemark/wemark.js"],
            // https://www.npmjs.com/package/terser-webpack-plugin#terseroptionsco
            terserOptions: {
              mangle: true,
              compress: {
                // https://swc.rs/docs/configuration/minification
                drop_console: true,
                drop_debugger: true,
              },
              output: {
                // https://drylint.com/Webpack/terser-webpack-plugin.html#%E5%AE%89%E8%A3%85
                ascii_only: true, // 转义字符串和正则中的 Unicode 字符
              },
            },
          },
        ]);
      }
    },
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
