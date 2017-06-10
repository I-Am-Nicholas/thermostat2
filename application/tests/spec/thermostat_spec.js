"use strict";

describe("Thermostat", function() {
  var thermostat;
  var thermoHeight = 384;

  beforeEach(function() {
    thermostat = new Thermostat();
    var messages = new Messages();
    spyOn(thermostat, "resetGauge");
    spyOn(thermostat, "mercuryAlignment");
    spyOn(thermostat, "gaugeProperties").and.returnValue(thermoHeight)
  });

  it("initializes at default temperature", function() {
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
  });

  describe("calculates", function() {

    it("the incrementation of the mercury", function() {
      expect(thermostat.gaugeIncrement()).toEqual(thermoHeight / thermostat.PSM_OFF_MAX);
    });

    it("the percentage of the gauge by which the mercury must move", function(){
      expect(thermostat.mercuryShiftPercentage()).toEqual(62.5);
    });

    it("the height of the temperature gauge", function() {
      expect(thermostat.gaugeProperties()).toEqual(thermoHeight)
    })

    describe("if energy usage is", function() {

      describe("high", function() {

        it("function returns true", function() {
          thermostat.temperature = thermostat.max_temp;
          expect(thermostat.highEnergyUsage()).toEqual(true)
        });

        it("function returns false", function() {
          thermostat.temperature = thermostat.max_temp;
          expect(thermostat.mediumEnergyUsage()).toEqual(false)
        });

        it("function returns false", function() {
          thermostat.temperature = thermostat.max_temp;
          expect(thermostat.lowEnergyUsage()).toEqual(false)
        });

      });

      describe("medium", function() {

        it("function returns true", function() {
          expect(thermostat.mediumEnergyUsage()).toEqual(true)
        });

        it("function returns false", function() {
          expect(thermostat.highEnergyUsage()).toEqual(false)
        });

        it("function returns false", function() {
          expect(thermostat.lowEnergyUsage()).toEqual(false)
        });

      });

      describe("low", function() {

        it("function returns true", function() {
          thermostat.temperature = thermostat.MIN_TEMP;
          expect(thermostat.lowEnergyUsage()).toEqual(true)
        });

        it("function returns false", function() {
          thermostat.temperature = thermostat.MIN_TEMP;
          expect(thermostat.highEnergyUsage()).toEqual(false)
        });

        it("function returns false", function() {
          thermostat.temperature = thermostat.MIN_TEMP;
          expect(thermostat.mediumEnergyUsage()).toEqual(false)
        });

      });

    });

  });

  describe("throws an error", function() {

    it("if an attempt is made to lower temperature below minimum temperature", function() {
      for(var i = 0; i < 10; i ++) {
        thermostat.decreaseTemperature()
      }
      expect(function(){thermostat.decreaseTemperature();}).toThrow("Temperature cannot fall below the minimum.");
    });

    it("if an attempt is made to raise temperature above max temperature with power saving mode on", function() {
      for(var i = 0; i < 5; i ++) {
        thermostat.powerSavingModeOn();
      }
      expect(function(){thermostat.increaseTemperature();}).toThrow("Temperature cannot rise above the maximum.");
    });

    it("if an attempt is made to raise temperature above max temperature with power saving mode off", function() {
      thermostat.powerSavingModeOff();
      for(var i = 0; i < 12; i ++) {
        thermostat.increaseTemperature();
      }
      expect(function() {thermostat.increaseTemperature();}).toThrow("Temperature cannot rise above the maximum.");
    });

  });

});
