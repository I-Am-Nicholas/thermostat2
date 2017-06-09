'use strict';

describe("Features", function() {
  describe("Thermostat", function() {
    var thermostat;

    beforeEach(function(){
      thermostat = new Thermostat();
      spyOn(thermostat, 'resetGauge');
      spyOn(thermostat, 'mercuryAlignment');
    });

    describe('adjusts the temperature,', function(){

      it(" raising it by 1 degree", function() {
        thermostat.increaseTemperature()
        expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP + 1);
      });

      it("decreasing it by 1 degree", function() {
        thermostat.decreaseTemperature()
        expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP - 1);
      });

      it("resetting it to the default value", function() {
        thermostat.increaseTemperature();
        thermostat.resetTemperature();
        expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
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

      it('adjusts the temperature to its default', function(){
        thermostat.increaseTemperature();
        thermostat.powerSavingModeOn();
        expect(thermostat.getCurrentTemperature()).toEqual(thermostat.PSM_ON_MAX);
      });

    });

    describe("Displays current energy usage", function() {

      it("as low when below lowest temp setting", function() {
        for(var i = 0; i < 3; i ++) {
          thermostat.decreaseTemperature();
        }
        expect(thermostat.currentEnergyUsage()).toEqual("Low")
      });

      it("as medium when between lowest and max temp when psm is ", function() {
        expect(thermostat.currentEnergyUsage()).toEqual("Medium")
      });

      it("as high when above Power Saving Mode default", function() {
        for(var i = 0; i < 5; i ++) {
          thermostat.increaseTemperature();
        }
        expect(thermostat.currentEnergyUsage()).toEqual("High")
      });

    });

  });

});
