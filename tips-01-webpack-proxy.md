# 关于 webpack 跨域问题

### 通过 Webpack 来解决浏览器跨域的问题，在之前一直都了解，但是并没有真正配置过。前一段时间，因为项目需求，尝试在 Webpack 中配置，在网上查了一下，其实也还是蛮简单的。通过简单的配置，即可达到要求，切实体会到了 Webpack 的强大方便。

### 只需在 Webpack-dev 环境中配置如下即可。

```
devServer:{
      historyApiFallback: true,
      hot: true,
      inline: true,
      compress:true,
      proxy: {
        '/api/*': {
          target: 'http://30.16.70.11:8400',
          secure: false,
          changeOrigin: true
        },
        '/Admin/*': {
          target: 'http://hrm-test.yb.paic.com.cn/index.php?s=/',
          secure: false,
          changeOrigin: true
        }
      },
    },
    plugins: [
```

### 主要就是 proxy 部分。这样所有通过 /api/ 的请求都会转向http://30.16.70.11:8400， 以后更改服务器地址什么的，只需在这里改即可，方便明了。
