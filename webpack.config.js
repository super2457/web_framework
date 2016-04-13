var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var dedupePlugin = webpack.optimize.DedupePlugin;
var commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/**
 * 需要注意的是,因为babel打包非常消耗时间,所以不建议js和css一起使用babel打包
 */

module.exports = {
    entry: {
        //入口文件
        index: './src/script/index.js',
        test: './src/script/test.js'
    },
    output: {
        //出口文件
        path: './public/script/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.gif$/,
                loader: "url-loader",
                query: { limit: 10000, mimetype: "image/gif" }
            },
            {
                test: /\.jpg$/,
                loader: "url-loader",
                query: { limit: 10000, mimetype: "image/jpg" }
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { limit: 10000, mimetype: "image/png" }
            },
            {
                test: /\.svg$/,
                loader: "url-loader",
                query: { limit: 10000, mimetype: "svg+xml" }
            },
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,  //排除这2个目录
                loader: 'babel',
                query: {
                    presets: ['es2015-loose', 'stage-0'], //babel plugins,如果需要 react的话
                    cacheDirectory: true, //缓存目录, 减少babel加载编译时间 默认是false
                    //cacheIdentifier : '.babelrc', //babel 核心识别文件
                    plugins: ['transform-runtime','transform-es5-property-mutators','transform-jscript']
                }
            }
        ]
    },
    /**
     *  webpack 插件：http://webpack.github.io/docs/list-of-plugins.html
     *  #uglifyjsplugin：最小js,压缩变量名
     *  #dedupeplugin：搜索重复模块,减少输出,上线时使用
     *  #commonschunkplugin：多出口文件的时候，把共同的部分打包成为一个公共文件
     */
    plugins: [
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // new dedupePlugin(),

        new commonsChunkPlugin('common.js')
    ]
};