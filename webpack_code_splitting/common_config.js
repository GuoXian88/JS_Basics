const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // Specify the common bundle's name.
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};


/*
index.bundle.js  665 bytes       0  [emitted]         index
another.bundle.js  537 bytes       1  [emitted]         another
common.bundle.js     547 kB       2  [emitted]  [big]  common

*/
//动态加载lodash  babel-plugin-syntax-dynamic-import
function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        var element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;

    }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
})


//多页面应用 通过name来引用 html里引用通过chunk/[name].chunk.js
{
    entry: {
        a: "./a",
        b: "./b",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        //该方法可以添加多个彼此不互相依赖的文件
        c: ["./c", "./d"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js" // a.enrty.js, b.enrty.js, c.entry.js
    }
}

plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app']
    })
  ]


output: {
    path: path.join(__dirname, './dist'),
    filename: isProduction ?'js/[name].[hash:8].js':'js/[name].js',
    publicPath: '/dist/',
    chunkFilename: 'chunk/[name].chunk.js'
},

//path: 打包文件存放的绝对路径 
 //publicPath: 网站运行时的访问路径 
 //filename:打包后的文件名


plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery', // 使jquery变成全局变量,不用在自己文件require('jquery')了
        jQuery: 'jquery',
        React: 'react',
        ReactDOM: 'react-dom'
    }),
    // 类库统一打包生成一个文件
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProduction ? 'js/vendor.[hash:8].js':'js/vendor.js',
        minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin(isProduction ? 'css/[name].[hash:8].css':'css/[name].css')
],



在webpack中JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等静态文件都是模块，不同模块的加载是通过模块加载器（webpack-loader）来统一管理的。loaders之间是可以串联的，一个加载器的输出可以作为下一个加载器的输入，最终返回到JavaScript上。

例子：

 module: {
 	//加载器配置
 	loaders: [
 		//.css 文件使用 style-loader 和 css-loader 来处理
 		{ 
 			test: /\.css$/, 
 			loader: 'style-loader!css-loader' 
 		},
 		//.js 文件使用 jsx-loader 来编译处理
 		{ 
 			test: /\.js$/, 
 			loader: 'jsx-loader?harmony' 
 		},
 		//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
 		{ 
 			test: /\.scss$/, 
 			loader: 'style!css!sass?sourceMap'
 		},
 		//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
 		{ 
 			test: /\.(png|jpg)$/, 
 			loader: 'url-loader?limit=8192'
 		}
 	]
 }
 
 
 resolve: {
    //查找module的话从这里开始查找
    root: '/pomy/github/flux-example/src', //绝对路径
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', '.scss'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        ActionType : 'js/actions/ActionType.js',
        AppAction : 'js/actions/AppAction.js'
    }
}


/**
 webpack会将文件内容存在compilation这个大的object里面，方便各种插件，loader间的调用。虽然gulp也用到了流(pipe)这样的内存处理方式，但感觉webpack更进一步。gulp是每一个任务(task)用一个流，而webpack是共享一个流

 代码热替换, HotModuleReplacementPlugin
生成html文件，HtmlWebpackPlugin
将css成生文件，而非内联，ExtractTextPlugin
报错但不退出webpack进程，NoErrorsPlugin
代码丑化，UglifyJsPlugin，开发过程中不建议打开
多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
清理文件夹，Clean
调用模块的别名ProvidePlugin，例如想在js中用$，如果通过webpack加载，需要将$与jQuery对应起来

process.env.NODE_ENV

如果你想将react分离，不打包到一起，可以使用externals。然后用<script>单独将react引入


上面这样的做法当然是 ok 的，但是对于很多的 npm 包来说，他们完全没有经过 babel 的必要（成熟的 npm 包会在发布前将自己 es5，甚至 es3 化），让这些包通过 babel 会带来巨大的性能负担，毕竟 babel6 要经过几十个插件的处理，虽然 babel-loader 强大，但能者多劳的这种保守的想法却使得 babel-loader 成为了整个构建的性能瓶颈。所以我们可以使用 exclude，大胆地屏蔽掉 npm 里的包，从而使整包的构建效率飞速提高。

module: {
    loaders: [
      {
          test: /\.js(x)*$/,
          loader: 'babel-loader',
          exclude: function(path) {
              // 路径中含有 node_modules 的就不去解析。
              var isNpmModule = !!path.match(/node_modules/);
              return isNpmModule;
          },
          query: {
              presets: ['react', 'es2015-ie', 'stage-1']
          }
      }
    ]
}

HappyPack
 */