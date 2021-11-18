const microtime = Date.now().toString()
const RemovePlugin = require("remove-files-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const prodConfig = {
  output: {
    filename: "./assets/scripts/[name].js",
    publicPath: `/wp-content/themes/bdswiss/dist/`
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader?url=false", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|webp|ico)$/i,
        loader: "file-loader",
        options: {
          name: "./assets/[folder]/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new RemovePlugin({ before: { include: ["./dist"] } }),
    new MiniCssExtractPlugin({ filename: "./style.css" }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: false } }]
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "**/*.php",
          transform(content) {
            return content.toString()
            .replace(`wp_enqueue_script( 'bdswiss-script', 'http://localhost:8080/app.js', [], '1', true );`,
            `wp_enqueue_script( 'bdswiss-script', get_template_directory_uri() . '/assets/scripts/app.js', [], '${microtime}', true );`)
            .replace(`// wp_enqueue_style( 'bdswiss-style', get_stylesheet_uri() );`,
            `wp_enqueue_style( 'bdswiss-style', get_stylesheet_uri(), [], '${microtime}', 'all' );`)
          }
        },
        {
          from: "assets/images",
          to: "assets/images"
        },
        {
          from: "assets/videos",
          to: "assets/videos"
        },
        {
          from: "screenshot.jpg",
          to: "screenshot.jpg"
        }
      ]
    })
  ]
}

module.exports = prodConfig
