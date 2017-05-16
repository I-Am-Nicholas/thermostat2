'use strict';

$( document ).ready(function() {
  var thermo = new Thermostat();

  $ ("#current-temp").text(thermo.getCurrentTemperature());
  thermo.resetGauge();

  $ ("#change-temp-up").click(function() {
    thermo.increaseTemperature();
    $ ('#mercury').css('height', '+=' + thermo.GAUGE_INCREMENT);
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
  });

  $ ('#change-temp-down').click(function() {
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
    $ ("#current-energy-usage").text(thermo.currentEnergyUsage());
    $ ("#current-temp").text(thermo.getCurrentTemperature());
    $ ("#current-psm").text("ON");
  });

  $ ("#change-psm-off").click(function(){
    thermo.powerSavingModeOff();
    $ ("#current-psm").text("OFF");
  });

  $ ("#current-energy-usage").text(thermo.currentEnergyUsage());

});
