'use strict';

describe("Thermostat", function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
    var messages = new Messages();
    spyOn(thermostat, 'resetGauge');
    spyOn(thermostat, 'mercuryAlignment');
    var thermoHeight = 384
    spyOn(thermostat, 'gaugeProperties').and.returnValue(thermoHeight)
  });

  it("initializes at default temperature", function() {
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMP);
  });

  describe('calculates', function(){
    var thermoHeight = 384

    it('the incrementation of the mercury', function(){
      expect(thermostat.gaugeIncrement()).toEqual(thermoHeight / thermostat.PSM_OFF_MAX);
    });

    it('the percentage of the gauge by which the mercury must move', function(){
      expect(thermostat.mercuryShiftPercentage()).toEqual(62.5);
    });

    it('the height of the temperature gauge', function(){
      expect(thermostat.gaugeProperties()).toEqual(thermoHeight)
    })

  });

  describe("throws an error", function(){

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
    })
  });

});
