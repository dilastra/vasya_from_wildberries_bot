const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: "./src/bot.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin({
      watch: path.resolve("./build"),
      ignore: ["*.js.map"],
      verbose: true,
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};
