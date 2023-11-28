const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
// var webpack = require('webpack');

// // import plugin
// var BomPlugin = require('webpack-utf8-bom');

module.exports = {
    entry: {
        index: "./src/index.jsx"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                   presets: ['@babel/preset-env', '@babel/preset-react'],
                 },
              },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]

            },
        ],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./public/manifest.json", to: "../manifest.json" },
        //         { from: "./public/devtools.html", to: "../devtools.html" },
        //         { from: "./public/devtools.js", to: "../devtools.js" },
        //         { from: "./public/panel.html", to: "../panel.html" }
        //     ],
        // }),
        ...getHtmlPlugins(["index"]),
        // new BomPlugin(true),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
                 '@mui/styled-engine': '@mui/styled-engine-sc'
              },
    },
    output: {
        path: path.join(__dirname, "build/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}