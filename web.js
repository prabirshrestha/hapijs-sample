var Hapi        = require('hapi'),
    server      = Hapi.createServer(3000),

    plugins     = [
        './plugins/log',
        './plugins/persons'
    ];

server.route({ method: 'GET', path: '/', handler: function (request, reply) {
    reply().redirect('/persons');
}});

server.route({ method: '*', path: '/{p*}', handler: function notFound (request, reply) {
    reply('The page was not found').code(404);
}});

server.pack.require(plugins, function (err) {
    if(err) throw err;
    server.start(function (err) {
        if(err) throw err;
        console.log('server started at ' + server.info.uri)
    });
});
