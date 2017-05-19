'use strict';

describe("Messages", function() {
  var messages;

  beforeEach(function(){
    messages = new Messages();
  });

  describe('prints a warning if', function(){

    it('the temperature adjustment is too high', function(){
      expect(messages.maxTempError()).toEqual("Temperature cannot rise above the maximum.");
    });

    it('the temperature adjustment is too low', function(){
      expect(messages.minTempError()).toEqual("The temperature cannot fall below the minimum.");
    });

  });

});
