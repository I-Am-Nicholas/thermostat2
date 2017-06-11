describe("JQweery", function(){

  var thermo = new Thermostat();

  it("Should find jQuery", function(){
    expect($).not.toBeNull();
  });


  // it("Should display 'Up' ", function(){
  //   expect($("#change-temp-up")[0].innerHTML).toEqual("Up");
  // });
  //
  // it("Should initialize with Default Temp", function(){
  //   $("#change-temp-up").trigger("click");
  //   expect(thermo.getCurrentTemperature()).toEqual(21);
  // });


});
