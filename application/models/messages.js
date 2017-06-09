'use strict';

var Messages = function() {
};

Messages.prototype.maxTempError = function(){
  return "Temperature cannot rise above the maximum."
};

Messages.prototype.minTempError = function(){
  return "Temperature cannot fall below the minimum."
};

Messages.prototype.highTemp = function() {
  return "High"
};

Messages.prototype.lowTemp = function() {
  return "Low"
};

Messages.prototype.mediumTemp = function() {
  return "Medium"
};
