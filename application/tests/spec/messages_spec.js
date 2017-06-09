'use strict';

describe("Messages", function() {
  var messages;

  beforeEach(function() {
    messages = new Messages();
  });

  describe('displays a warning if', function() {

    it('the temperature adjustment is too high', function() {
      expect(messages.maxTempError()).toEqual("Temperature cannot rise above the maximum.");
    });

    it('the temperature adjustment is too low', function() {
      expect(messages.minTempError()).toEqual("Temperature cannot fall below the minimum.");
    });

  });
  describe('displays usage message as', function() {

    it('High', function() {
      expect(messages.highTemp()).toEqual('High')
    });

    it('Medium', function() {
      expect(messages.mediumTemp()).toEqual('Medium')
    });

    it('Low', function() {
      expect(messages.lowTemp()).toEqual('Low')
    });

  });

});
