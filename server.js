const liveServer = require("live-server");

liveServer.start({
    port: 8080,
    open: true,
    logLevel: 1,
    ignore: 'src,docs,node_modules',
    wait: 3
});