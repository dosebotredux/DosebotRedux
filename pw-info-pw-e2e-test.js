const info = require('./commands/info');

info.run(null, {
    content: '4-aco-dmt',
    guild: {
        name: 'foo'
    },
    channel: {
        send: console.log
    }
})

const effects = require('./commands/effects');

const p1 = function(...args) {
    console.log(...args);

    return {
        catch: () => {}
    }
};

effects.run(null, {
    content: '4-aco-dmt',
    guild: {
        name: 'foo'
    },
    channel: {
        send: p1
    }
})
