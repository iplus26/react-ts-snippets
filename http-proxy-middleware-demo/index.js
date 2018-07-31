var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', proxy({
    target: 'http://10.118.99.200', 
    changeOrigin: true,
    headers: {
        Host: 'pgc.data.vmp.webdev.com',
    }
}));
app.listen(3000);
