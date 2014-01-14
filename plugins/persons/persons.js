var Hapi = require('hapi');

exports.register = function (plugin, options, next) {

    var persons = [ { id: 1, name: 'Prabir Shrestha' }];

    plugin.route({ method: 'GET', path: '/persons', handler: function (request, reply) {
        reply(persons);
    }});

    plugin.route({ method: 'GET', path: '/persons/{id}', config: {
        validate: {
            path: {
                id: Hapi.types.Number()
            }
        },
        handler: function (request, reply) {
            var id      = parseInt(request.params.id),
                person  = persons.filter(function (person) { return person.id === id; })[0];

            if(person) {
                return reply(person);
            } else {
                reply(new Hapi.error.notFound('person not found'));
            }
        }
    }});

    plugin.route({ method: 'POST', path: '/persons', config: {
        validate: {
            payload: {
                name: Hapi.types.String().required().min(3)
            }
        },
        handler: function (request, reply) {
            var person = {
                id:     new Date().getTime(),
                name:   request.payload.name
            };
            persons.push(person);
            reply(person);
        }
    }});

    plugin.route({ method: 'DELETE', path: '/persons/{id}', config: {
        validate: {
            path: {
                id: Hapi.types.Number()
            }
        },
        handler: function (request, reply) {
            var index = persons
                .map(function (person) { return person.id })
                .indexOf(parseInt(request.params.id));

            if(index === -1) {
                return reply(Hapi.error.notFound('person not found'));
            }

            persons.splice(index, 1);
            reply().code(204);
        }
    }});

    next();
};
