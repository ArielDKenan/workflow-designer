'use strict';

const proxy = require('http-proxy-middleware');
const devConfig = require('./getDevConfig');

module.exports = function (server) {
    let proxyConfigDefaults = {
        changeOrigin: true,
        secure: false,
        onProxyRes: (proxyRes, req, res) => {
            let setCookie = proxyRes.headers['set-cookie'];
            if (setCookie) {
                setCookie[0] = setCookie[0].replace('USER_ID', 'cs0008');
            }
        }
    };

    let middlewares = [
        (req, res, next) => {
            let newUrl = null;
            newUrl = req.url.replace('sdc-aee/sdc-aee', 'sdc-aee');
            if (req.url.indexOf('index_bundle') > -1) {
                let urlSplit = req.url.split('/');
                let replaceFile = urlSplit.pop();
                let extension = replaceFile.substring(replaceFile.lastIndexOf('.'));
                newUrl = urlSplit.join('/') + '/index_bundle.js';
            }
            if (newUrl !== req.url) {
                console.log(`----------------> Proxy Rewriting URL: ${req.url} -> ${newUrl}`);
                req.url = newUrl;
            }
            next();
        }
    ];

    middlewares.push(
        proxy(["/sdc1"], Object.assign({}, proxyConfigDefaults, {
            target: devConfig.proxyTarget,
            pathRewrite: {"/onboarding-api": "/sdc1/feProxy/onboarding-api"}
        }))
    );
    server.use(middlewares);
};
