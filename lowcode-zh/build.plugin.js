const { join } = require('path');
const fs = require('fs-extra');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const scenarioNames = fs.readdirSync(join('./src/scenarios')).filter(name => !name.startsWith('.'));
const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = ({context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    config.merge({
      node: {
        fs: 'empty',
      },
    });

    scenarioNames.forEach(name => {
      const hasTsx = fs.existsSync(join(`./src/scenarios/${name}/index.tsx`));
      config.merge({
        entry: {
          [name]: hasTsx ? require.resolve(`./src/scenarios/${name}/index.tsx`) : require.resolve(`./src/scenarios/${name}/index.ts`),
        },
      });
      config
        .plugin(name)
        .use(HtmlWebpackPlugin, [
          {
            inject: false,
            minify: false,
            templateParameters: {
              scenario: name,
              version,
            },
            template: require.resolve('./public/index.ejs'),
            filename: `${name}.html`,
          },
        ]);
      config
        .plugin('define')
        .use(context.webpack.DefinePlugin, [{
          VERSION_PLACEHOLDER: JSON.stringify('1.0.0'),
        }]);
    })

    config
      .plugin('preview')
      .use(HtmlWebpackPlugin, [
        {
          inject: false,
          templateParameters: {
          },
          template: require.resolve('./public/preview.html'),
          filename: 'preview.html',
        },
      ]);

    config.plugins.delete('hot');
    config.devServer.hot(false);

    config.module // fixes https://github.com/graphql/graphql-js/issues/1272
      .rule('mjs$')
      .test(/\.mjs$/)
      .include
        .add(/node_modules/)
        .end()
      .type('javascript/auto');

      // config.module
      // .rule('js$')
      // .test(/\.js$/)
      // .include
      //   .add(path.join(__dirname,'src/scenarios/index/lib'))
      //   .end()
      // .use('babel')
      //   .loader('babel-loader')
      //   .options({
      //     "presets": [
      //         "@babel/preset-env"
      //     ],
      //       "plugins": [
      //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
      //         ["@babel/plugin-proposal-class-properties", { "loose": true }]
      //       ]
      //   })

  });
};
