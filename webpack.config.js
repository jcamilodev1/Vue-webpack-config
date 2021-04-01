const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js", // punto de entrada
  output: {
    // salida
    path: __dirname + "/dist", // carpeta que contendra el archivo de salida
    
    filename: "bundle.js", // nombre del archivo que va a salir
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: "vue-loader",
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
