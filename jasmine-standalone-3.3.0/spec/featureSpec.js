describe("Features", function() {
  beforeEach(function() {
    scorecard = new ScoreCard();
  });

  describe("Play a game", function() {
    it("displays result of a given frame", function() {
      bowlResults([3, 6]);
      expect(scorecard.frames[0].bowls[0]).toEqual(3);
      expect(scorecard.frames[0].bowls[1]).toEqual(6);
    });
  });

  describe("Output display score of individual frame", function() {
    it("will not display if strike achieved and bonus not yet added (0/2 bonus rolls)", function() {
      bowlResults([10]);
      expect(scorecard.frameScoreDisplay(0)).toBe(null);
    });

    it("will not display if strike achieved and bonus not yet added (1/2 bonus rolls)", function() {
      bowlResults([10]);
      bowlResults([10]);
      expect(scorecard.frameScoreDisplay(0)).toBe(null);
    });

    it("will display if strike achieved and bonus added (2/2 bonus rolls - both strikes)", function() {
      bowlResults([10]);
      bowlResults([10]);
      bowlResults([10]);
      expect(scorecard.frameScoreDisplay(0)).toEqual(30);
    });

    it("will display if strike achieved and bonus added (2/2 bonus rolls - one strike, one non-strike)", function() {
      bowlResults([10]);
      bowlResults([10]);
      bowlResults([4]);
      expect(scorecard.frameScoreDisplay(0)).toEqual(24);
    });

    it("will display if strike achieved and bonus added (2/2 bonus rolls - both non-strikes)", function() {
      bowlResults([10]);
      bowlResults([6]);
      bowlResults([4]);
      expect(scorecard.frameScoreDisplay(0)).toEqual(20);
    });

    it("will not display if spare achieved and bonus not yet added (0/1 bonus rolls)", function() {
      bowlResults([6, 4]);
      expect(scorecard.frameScoreDisplay(0)).toBe(null);
    });

    it("will display if spare achieved and bonus added (1/1 bonus rolls)", function() {
      bowlResults([6, 4]);
      bowlResults([10]);
      expect(scorecard.frameScoreDisplay(0)).toEqual(20);
    });

    it("will display if both rolls of frame equal less than 10", function() {
      bowlResults([3, 2]);
      expect(scorecard.frameScoreDisplay(0)).toEqual(5);
    });

    it("will display in final frame if first two rolls equal less than 10", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([3, 2]);
      expect(scorecard.frameScoreDisplay(9)).toEqual(5);
    });

    it("will not display in final frame if strike achieved and bonus not yet added (0/2 bonus rolls)", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10]);
      expect(scorecard.frameScoreDisplay(9)).toBe(null);
    });

    it("will not display in final frame if strike achieved and bonus not yet added (1/2 bonus rolls)", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10, 7]);
      expect(scorecard.frameScoreDisplay(9)).toBe(null);
    });

    it("will display in final frame if strike achieved and bonus added (2/2 bonus rolls)", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10, 7, 2]);
      expect(scorecard.frameScoreDisplay(9)).toEqual(19);
    });

    it("will not display in final frame if spare achieved and bonus not yet added (0/1 bonus rolls)", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([7, 3]);
      expect(scorecard.frameScoreDisplay(9)).toBe(null);
    });

    it("will display in final frame if spare achieved and bonus added (1/1 bonus rolls)", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([7, 3, 4]);
      expect(scorecard.frameScoreDisplay(9)).toEqual(14);
    });
  });

  describe("End a frame", function() {
    it("will not end frame after one roll if strike is not achieved", function() {
      bowlResults([3]);
      expect(scorecard.currentFrameOver()).toBe(false);
    });

    it("will end frame after one roll if strike is achieved", function() {
      bowlResults([10]);
      expect(scorecard.currentFrameOver()).toBe(true);
    });

    it("will end frame after two rolls if strike is not achieved", function() {
      bowlResults([4, 5]);
      expect(scorecard.currentFrameOver()).toBe(true);
    });

    it("will allow three rolls in final frame if spare is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([5, 5]);
      expect(scorecard.currentFrameOver()).toBe(false);
    });

    it("will allow three rolls in final frame if strike is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10, 0]);
      expect(scorecard.currentFrameOver()).toBe(false);
    });
  });

  describe("End a game", function() {
    it("will only allow two rolls in final frame if strike or spare is not achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([2, 3]);
      expect(scorecard.gameOver()).toBe(true);
    });

    it("will allow three rolls in final frame if spare is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([5, 5]);
      expect(scorecard.gameOver()).toBe(false);
    });

    it("will allow three rolls in final frame if strike is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10, 0]);
      expect(scorecard.gameOver()).toBe(false);
    });

    it("will end game after third roll in final frame if spare is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([5, 5, 0]);
      expect(scorecard.gameOver()).toBe(true);
    });

    it("will end game after third roll in final frame if strike is achieved", function() {
      for (var i = 0; i < 9; i++) {
        bowlResults([0, 0]);
      }
      bowlResults([10, 0, 0]);
      expect(scorecard.gameOver()).toBe(true);
    });
  });

  var bowlResults = function(testResults) {
    frame = new Frame();
    for (var i = 0; i < testResults.length; i++) {
      frame.bowlResult(testResults[i]);
    }
    scorecard.addFrame(frame);
  };
});
