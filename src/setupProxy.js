const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/json", {
      target: "http://de1.api.radio-browser.info",
      changeOrigin: true,
    })
  );
};
