const environment = 'development'; // Change to 'production' for production builds

const config = {
    development: {
        logLevel: 'debug',
        apiBasePath: '/', // Served from the root of the dev server
        dictionaryPath: 'data/dictionary.json'
    },
    production: {
        logLevel: 'info',
        apiBasePath: 'https://your-production-domain.com/',
        dictionaryPath: 'data/dictionary.json'
    }
};

export default config[environment];
