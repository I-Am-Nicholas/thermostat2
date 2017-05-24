'use strict';

describe("Features", function() {
  describe("Thermostat", function() {
    var thermostat;

    beforeEach(function(){
      thermostat = new Thermostat();
      spyOn(thermostat, 'resetGauge');
      spyOn(thermostat, 'mercuryAlignment');
    });

    it("raises the temperature by 1 degree", function() {
      thermostat.increaseTemperature()
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP + 1);
    });

    it("decreases the temperature by 1 degree", function() {
      thermostat.decreaseTemperature()
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP - 1);
    });

    it("resets the temperature to the default value", function() {
      thermostat.increaseTemperature();
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
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

  });
});
