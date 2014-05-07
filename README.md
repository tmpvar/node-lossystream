#lossy stream

This simple readable/writable stream drops writes when in a paused state.

`npm install lossystream`

__usage__

 ```javascript

var lossy = require('lossystream');

var dropped = function(d) {
  // d contains the data that was dropped
};

someStream.pipe(lossy().on('drop', dropped)).pipe(slowStream);

```

__why?__

I'm using this to push images (640x480) to the browser over binary websockets. The browser freezes if I try to send this much data 30 times a second.
