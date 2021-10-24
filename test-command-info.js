var rewire = require("rewire");
var rewiredINFO = rewire('./commands/info');
var assert = require('assert');


// validate search works
rewiredINFO.__set__("customsJSON", {
  'data': {
    'substances': [
      {
        'name': '2C-E'
      },
      {
        'name': '2C-b'
      }
    ]
  }
});

const locateCustomSheetLocation = rewiredINFO.__get__('locateCustomSheetLocation');
const parseSubstanceName = rewiredINFO.__get__('parseSubstanceName');

// test that search works for lowercased custom entry for substance that exists
assert.notEqual(locateCustomSheetLocation("2c-e"), undefined, "should find 2C-E with locateCustomSheetLocation");

// test that search doesn't work for lowercased custom entry for substance that does not exist
assert.equal(locateCustomSheetLocation("2c-p"), undefined, "should not find misscased 2c-p with locateCustomSheetLocation");


assert.equal(parseSubstanceName("--info 1cP-LSd"), "1cp-lsd", "case insensitivity comparison did not work between 1cP-LSd and 1cp-lsd");
assert.notEqual(locateCustomSheetLocation(parseSubstanceName("--info 2c-e")), undefined, "case insensitive searches over customJSON must work");


// test that if a substance is not in the common list, it reaches out to PW
// please forgive me for what follows

spied_messages = [];
old_console_log = console.log;

rewiredINFO.__set__("console", {
  log: function (msg) {
    spied_messages.push(msg);
    old_console_log(msg);
  }
});

rewiredINFO.__set__('createPWChannelMessage', function(substance, message){ return true;});
rewiredINFO.__set__('fetchPWSubstanceData', function(substance, message){ return {
'data': {
  'substances': {
    'length': 1,
  }
}
};});

rewiredINFO.run(null, {
  content: '1B-LSD',
  guild: {
      name: 'foo'
  },
  channel: {
      send: old_console_log
  }
});

assert.equal(spied_messages[0], 'Pulling from PW', 'should attempt to pull from PW substance API missing non-custom substances');