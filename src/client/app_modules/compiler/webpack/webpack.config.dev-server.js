const config = require('./build-config');

const PORT_SERVER = 3001;
const getDevModeConfig = ({ path, webpack }) => {
    const {
        paths: { outputBasePath }
    } = config;

    return {
        devtool: 'sourcemap',
        devServer: {
            hot: true,
            open: true,
            inline: true,
            compress: true,
            host: 'localhost', // Defaults to localhost
            openPage: '',
            port: config.PORT,
            contentBase: path.join(__dirname, outputBasePath),
            https: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            proxy: {
                '/': {
                    target: `https://localhost:${PORT_SERVER}/`,
                    secure: false
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: false
            })
        ]
    };
};

export default getDevModeConfig;
