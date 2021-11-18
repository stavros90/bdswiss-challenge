const webpack = require("webpack")
const chokidar = require("chokidar")

const devConfig = {
  output: {
    publicPath: "http://bdswiss.local:8080/"
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: ["style-loader", "css-loader?url=false", "sass-loader"]
      }
    ]
  },
  devServer: {
    before(app, server) {
      chokidar.watch(["./**/*.php"]).on("all", function () {
        server.sockWrite(server.sockets, "content-changed")
      })
    },
    port: 8080,
    compress: true,
    stats: "errors-only",
    overlay: true,
    disableHostCheck: true
  }
}

module.exports = devConfig
