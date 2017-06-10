"use strict";

function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.temperature = this.DEFAULT_TEMP;
  this.power_saver = false;
  this.max_temp = 32;
  this.MIN_TEMP = 10;
  this.PSM_ON_MAX = 25;
  this.PSM_OFF_MAX = this.max_temp;
  this.LOWEST = 18;
};

var messages = new Messages();

Thermostat.prototype = {
  constructor: Thermostat,
  getCurrentTemperature: function() {
    return this.temperature;
  }
};

Thermostat.prototype.increaseTemperature = function() {
  if ((this.temperature + 1) > this.max_temp){
    throw(messages.maxTempError())
  } else {
    this.temperature += 1;
    this.mercuryAlignment();
  }
};

Thermostat.prototype.decreaseTemperature = function() {
  if ((this.temperature - 1) < this.MIN_TEMP) {
    throw(messages.minTempError())
  } else {
    this.temperature -= 1;
  }
};

Thermostat.prototype.gaugeProperties = function() {
  return document.getElementById("temperature-gauge").clientHeight;
};

Thermostat.prototype.gaugeIncrement = function() {
  return this.gaugeProperties() / this.max_temp;
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.DEFAULT_TEMP;
  this.resetGauge();
};

Thermostat.prototype.mercuryShiftPercentage = function() {
  return (this.temperature / this.PSM_OFF_MAX) * 100;
}

Thermostat.prototype.resetGauge = function() {
  document.getElementById("mercury").style.height = this.mercuryShiftPercentage() + '%'
};

Thermostat.prototype.mercuryHeight = function(){
  return document.getElementById("mercury").style.height;
};

Thermostat.prototype.gaugeHeight = function(){
  return document.getElementById("temperature-gauge").clientHeight;
};

Thermostat.prototype.mercuryAlignment = function() {
  if (parseInt(this.mercuryHeight()) > parseInt(this.gaugeHeight())) {
    this.mercuryHeight() = (this.gaugeHeight() + "px");
  }
}

Thermostat.prototype.powerSavingModeOn = function() {
  this.currentEnergyUsage();
  this.power_saver = true;
  this.max_temp = this.PSM_ON_MAX;
  this.temperature = this.PSM_ON_MAX;
  this.resetGauge();
};

Thermostat.prototype.powerSavingModeOff = function() {
  this.power_saver = false;
  this.max_temp = this.PSM_OFF_MAX;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.power_saver;
};

Thermostat.prototype.currentEnergyUsage = function() {
  if (this.highEnergyUsage()) {
    return messages.highTemp();
  };
  if (this.lowEnergyUsage()) {
    return messages.lowTemp();
  };
  return messages.mediumTemp();
};

Thermostat.prototype.highEnergyUsage = function() {
  return (this.temperature >= this.PSM_ON_MAX)
};

Thermostat.prototype.lowEnergyUsage = function() {
  return (this.temperature <= this.LOWEST)
};

Thermostat.prototype.mediumEnergyUsage = function() {
  return (!this.highEnergyUsage() && !this.lowEnergyUsage())
};
