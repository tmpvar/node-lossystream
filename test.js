var lossy = require('./')(), assert = require('assert');

lossy.once('data', function() {

  // expect packets to be dropped
  lossy.paused = true;
  lossy.once('data', function() {
    assert.ok(false);
  });

  var dropped = 0;
  lossy.on('drop', function() {
    dropped++;
  });

  lossy.write('hello again');

  setTimeout(function() {

    // cleanup the previously attached listeners
    lossy.removeAllListeners('data')

    var called = false;

    lossy.once('data', function(d) {
      assert.equal(d, 'last packet');
      called = true;
    });

    lossy.paused = false;
    lossy.write('last packet');

    setTimeout(function() {
      assert.ok(called);
      assert.equal(dropped, 1);
    }, 100);

  }, 100);
});

lossy.write('hello');
