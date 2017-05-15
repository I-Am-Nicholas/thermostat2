'use strict';

describe("Thermostat", function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
    spyOn(thermostat, 'resetGauge');
    spyOn(thermostat, 'mercuryAlignment');
  });

  it("Initializes at default temperature", function(){
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
  });

  it("raises the temperature by 1 degree", function(){
    thermostat.increaseTemperature()
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP + 1);
  });

  it("decreases the temperature by 1 degree", function(){
    thermostat.decreaseTemperature()
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP - 1);
  });

  describe("Reset Temperature button", function(){
    it("resets the temperature to the default value", function() {
      thermostat.increaseTemperature();
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
    });
  });

  describe("throws an error", function(){
    it("if temperature is attempted to be adjusted to below 10 degrees", function(){
      for(var i = 0; i < 10; i ++) {
        thermostat.decreaseTemperature()
      }
      expect(function(){thermostat.decreaseTemperature();}).toThrow("The temperature cannot fall below the minimum.");
    });

    it("if temperature is attempted to be adjusted above 25 degrees when power saving is on", function(){
      for(var i = 0; i < 5; i ++) {
        thermostat.powerSavingModeOn();
      }
      expect(function(){thermostat.increaseTemperature();}).toThrow("Temperature cannot rise above the maximum.");
    });

    it("if temperature is attempted to be adjusted above 32 degrees when power saving mode is off", function() {
      thermostat.powerSavingModeOff();
      for(var i = 0; i < 12; i ++) {
        thermostat.increaseTemperature();
      }
      expect(function() {thermostat.increaseTemperature();}).toThrow("Temperature cannot rise above the maximum.");
    })
  });

  describe("Displays current energy usage", function() {
    it("as low-usage when below 18 degrees", function() {
      for(var i = 0; i < 3; i ++) {
        thermostat.decreaseTemperature();
      }
      expect(thermostat.currentEnergyUsage()).toEqual("Low")
    });

    it("as medium-usage when between 18 degrees and 24 degrees", function() {
      expect(thermostat.currentEnergyUsage()).toEqual("Medium")
    });

    it("as high-usage when above 25 degrees", function() {
      for(var i = 0; i < 5; i ++) {
        thermostat.increaseTemperature();
      }
      expect(thermostat.currentEnergyUsage()).toEqual("High")
    });
  });

  describe("Power Saving Mode", function() {
    it('is on', function() {
      thermostat.powerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toEqual(true);
    });

    it('is off', function() {
      thermostat.powerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toEqual(false);
    });

    it('adjusts the temperature to the Power Saving Mode default', function(){
      thermostat.increaseTemperature();
      thermostat.powerSavingModeOn();
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.PSM_ON_MAX);
    });
  });

});
