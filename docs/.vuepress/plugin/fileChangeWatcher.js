const chokidar = require('chokidar');
const path = require('path');

module.exports = (options, ctx) => {
    const changes = [];

    return {
        name: 'watch-plugin',

        async ready() {
            const watchDir = options.watchDir || path.resolve(ctx.sourceDir, '..');

            const watcher = chokidar.watch(watchDir, {
                ignored: /(^|[\/\\])\../, // 忽略隐藏文件
                persistent: true,
                depth: Infinity // 监视所有子目录
            });

            watcher
                .on('change', (filePath) => {
                    console.log(`File ${filePath} has been changed.`);
                    changes.push({ type: 'change', filePath, timestamp: new Date() });
                })
                .on('add', (filePath) => {
                    console.log(`File ${filePath} has been added.`);
                    changes.push({ type: 'add', filePath, timestamp: new Date() });
                })
                .on('unlink', (filePath) => {
                    console.log(`File ${filePath} has been removed.`);
                    changes.push({ type: 'unlink', filePath, timestamp: new Date() });
                });

            console.log(`Watching directory: ${watchDir}`);
        },

        // 提供一个全局变量，用于在 Vue 组件中访问变化情况
        enhanceAppFiles() {
            return {
                name: 'watch-plugin-enhance',
                content: `export default ({ Vue }) => {
                    Vue.prototype.$fileChanges = ${JSON.stringify(changes)};
                }`
            };
        }
    };
};

