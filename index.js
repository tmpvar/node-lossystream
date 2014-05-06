var
  util = require('util'),
  Stream = require('stream');

module.exports = function() {
  return new LossyStream();
};


function LossyStream() {
  Stream.call(this);
  this.writable = true;
  this.readable = true;
  this.paused = false;
}

util.inherits(LossyStream, Stream);


LossyStream.prototype.write = function(d) {
  if (!this.writable || this.paused) {
    // drop the data
    this.emit('drop', d);
    return;
  }

  this.emit('data', d);
};

LossyStream.prototype.pause = function () {
  this.paused = true;
};

LossyStream.prototype.resume = function () {
  this.paused = false;
  this.emit('drain');
};

LossyStream.prototype.destroy = function () {
  this.writable = false;
  this.readable = false;
  this.emit('end');
};

LossyStream.prototype.end = function (d) {
  if (d !== undefined) {
    return this.write(d);
  }

  this.writable = false;
};



