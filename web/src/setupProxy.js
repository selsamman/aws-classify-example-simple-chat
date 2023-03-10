const { createProxyMiddleware } = require('http-proxy-middleware');
fs = require('fs');

module.exports = function(app) {
    try {
        let awsProxy = process.env.AWSPROXY;
        if (!awsProxy) {
            const output = fs.readFileSync('../cloud/output.json');
            const outputObj = JSON.parse(output);
            awsProxy = 'https://' + outputObj.WebsiteUrl;
        }
        app.use(
            '/api',
            createProxyMiddleware({
                target: awsProxy,
                changeOrigin: true,
            })
        );
    } catch (e) {
        console.log('unable to setup proxy ' + e);
    }
};