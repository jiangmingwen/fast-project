const exec = require('child_process').exec;
const path = require('path');

/**
 * 
 * @param {} options 
 */
function HbCdnMountPlugin(options) {
    this.options = options;
}

HbCdnMountPlugin.prototype.apply = function (compiler) {
    // var jsList = this.options.scriptUrls || [];
    // var cssList = this.options.styleUrls || [];
    // jsList.reverse();
    // cssList.reverse();
    if (this.options.lib) {
        compiler.plugin('done', function (compilation, options) {
            const changelogPath = path.resolve(__dirname, './CHANGELOG.md');
            const readmePath = path.resolve(__dirname, './README.md');
            const packagePath = path.resolve(__dirname, './package.json');


            exec(`xcopy ${changelogPath} ${path.resolve(__dirname,'./library')}`, (err, stdout, stderr) => {
                // if (stdout) {
                console.log('拷贝成功了')
                // process.stdout.write(stdout);
                // } 
                // if (stderr) process.stderr.write(stderr);
            });

            exec(`xcopy ${readmePath} ${path.resolve(__dirname,'./library')}`, (err, stdout, stderr) => {
                // if (stdout) {
                console.log('拷贝成功了')
                // process.stdout.write(stdout);
                // } 
                // if (stderr) process.stderr.write(stderr);
            });


            exec(`xcopy ${packagePath} ${path.resolve(__dirname,'./library')}`, (err, stdout, stderr) => {
                // if (stdout) {
                console.log('拷贝成功了')
                // process.stdout.write(stdout);
                // } 
                // if (stderr) process.stderr.write(stderr);
            });

            // compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            //     jsList.forEach(item => {
            //         if (item) {
            //             htmlPluginData.assets.js.unshift(item);
            //         }
            //     });
            //     cssList.forEach(item => {
            //         if (item) {
            //             htmlPluginData.assets.css.unshift(item);
            //         }
            //     })
            // });
        });
    }

};

module.exports = HbCdnMountPlugin;