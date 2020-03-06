const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } =
    require('customize-cra');

const { resolve } = require("path");
module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: "css",
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#00F' },
    }),
    addWebpackAlias({
        '@': resolve('src')
    })
);
