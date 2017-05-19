'use strict';

$( document ).ready(function() {
  var thermo = new Thermostat();

  $ ("#current-temp").text(thermo.getCurrentTemperature());
  $ ("#info-1").text("MAX: " + thermo.PSM_OFF_MAX)
  $ ("#info-2").text("MIN: " + thermo.MIN_TEMP)
  thermo.resetGauge();

  jQuery.fn.extend({
    pump: function () {
      $ (this).animate({fontSize: '0.45em'}, "fast");
      $ (this).animate({fontSize: '0.4em'}, "fast");
    }
  });

  $ ("#change-temp-up").click(function() {
    if (thermo.temperature == thermo.max_temp) { $ ("#info-1").pump() }
    thermo.increaseTemperature();
    $ ('#mercury').css('height', '+=' + thermo.GAUGE_INCREMENT);
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
  });

  $ ('#change-temp-down').click(function() {
    if (thermo.temperature == thermo.MIN_TEMP) { $ ("#info-2").pump()}
    thermo.decreaseTemperature();
    $('#mercury').css('height', '-=' + thermo.GAUGE_INCREMENT);
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
  });

  $ ("#change-temp-reset").click(function() {
    thermo.resetTemperature();
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
  });

  $ ("#current-psm").text(function() {
      return thermo.isPowerSavingModeOn() == true ? "ON" : "OFF"
    });

  $ ("#change-psm-on").click(function(){
    thermo.powerSavingModeOn();
    $ ("#info-1").text("MAX: " + thermo.PSM_ON_MAX)
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-psm").text("ON");
  });

  $ ("#change-psm-off").click(function(){
    thermo.powerSavingModeOff();
    $ ("#info-1").text("MAX: " + thermo.PSM_OFF_MAX)
    $ ("#current-psm").text("OFF");
  });

  $ ("#current-energy-usage").text(thermo.currentEnergyUsage());

});
