
exports.register = function (plugin, options, next) {

    plugin.ext('onRequest', function (request, next) {
        console.log(request.method.toUpperCase() + ' ' + request.path);
        next();
    });

    next();
};
