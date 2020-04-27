import { baseConfiguraton, path, IS_PRODUCTION, merge } from './webpack.config.base';
import { getEntries } from './entry-builder';

const config = require('./build-config');

const clientConfiguration = merge(baseConfiguraton, {
    entry: getEntries(IS_PRODUCTION, path, path.join(__dirname, config.paths.rootPathRelativeToCompiler)),
    target: 'web',
    output: {
        path: path.join(__dirname, config.paths.outputBasePath),
        publicPath: IS_PRODUCTION ? config.paths.publicPath : '/',
        chunkFilename: IS_PRODUCTION ? '[name].min.js' : '[name].js',
        filename: IS_PRODUCTION ? '[name].min.js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(
                __dirname,
                config.paths.rootPathRelativeToCompiler,
                config.paths.componentsPathFromRoot
            ),
            utility: path.join(__dirname, config.paths.rootPathRelativeToCompiler, config.paths.utilityPathFromRoot),
            service: path.join(__dirname, config.paths.rootPathRelativeToCompiler, config.paths.servicePathFromRoot)
        }
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@material-ui/core': 'MaterialUI',
        'styled-components': 'styled'
    },
    module: {
        rules: [
            {
                test: /\.(woff2|woff|eot|svg|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            useRelativePath: false
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            ignorePath: path.join(__dirname, config.paths.rootPathRelativeToCompiler, '.eslintignore')
                        }
                    }
                ]
            },
            {
                test: /.js?$/,
                exclude: /node_modules\/(?!(refdata-admin-ui-core-components)\/).*/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            comments: true
                        }
                    }
                ]
            }
        ]
    }
});

export default clientConfiguration;
