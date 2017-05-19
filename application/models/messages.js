'use strict';

var Messages = function() {
};

Messages.prototype.maxTempError = function(){
  return "Temperature cannot rise above the maximum."
};

Messages.prototype.minTempError = function(){
  return "The temperature cannot fall below the minimum."
};
