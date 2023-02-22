const glob = require("glob");
const PAGE_PATH = './src/page2';
// const PAGE_PATH = './src/page1';

module.exports = {
    getPages: () => {

        //  首先得到包含pages文件夹里面符合条件的路径数组
        let entryHtml = glob.sync(PAGE_PATH + '/*/*.vue');

        //  pages就是vue.config.js里面pages选项的值，是一个对象
        let pages = {};

        //  遍历得到的路径数组，从字符串中分割出需要的页面名字
        entryHtml.forEach((filePath) => {
            let fileName = filePath.substring(filePath.substring(0, filePath.lastIndexOf('/')).lastIndexOf('/') + 1, filePath.lastIndexOf('/'));
            pages[fileName] = {
                entry: `src/page2/${fileName}/main.js`,
                // entry: `src/page1/${fileName}/main.js`,
                filename: `${fileName}.html`,
                template: `public/index.html`,
                title: `${fileName}`,
                chunks: [
                    'chunk-vendors',
                    'chunk-uspui',
                    `${fileName}`
                ],
                chunksSortMode: 'manual'
            }
            //  入口页面定制
            if (fileName === 'jslnx') {
                pages[fileName] = Object.assign(pages[fileName], {
                    template: `public/cloudindex.html`,
                    title: `跨区联络线`
                })
            }
        });
        // let pages = {
        //     index: {
        //         // page 的入口
        //         entry: 'src/pages/index/main.js',
        //         // 模板来源
        //         template: 'public/index.html',
        //         // 在 dist/index.html 的输出
        //         filename: 'index.html',
        //         // 当使用 title 选项时，
        //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        //         title: 'appdemo',
        //         // 在这个页面中包含的块，默认情况下会包含
        //         // 提取出来的通用 chunk 和 vendor chunk。
        //         chunks: ['chunk-vendors', 'chunk-common', 'index']
        //     },
        //     // 当使用只有入口的字符串格式时，
        //     // 模板会被推导为 `public/subpage.html`
        //     // 并且如果找不到的话，就回退到 `public/index.html`。
        //     // 输出文件名会被推导为 `subpage.html`。
        //     subpage: 'src/pages/subpage/main.js'
        // }
        return pages;
    }
};