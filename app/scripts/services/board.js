'use strict';

/**
 * @ngdoc service
 * @name devigetApp.board
 * @description
 * # board
 * Factory in the devigetApp.
 */
angular.module('devigetApp')
  .factory('board', function () {

    var BOARD_ROWS = 6;
    var BOARD_COLS = 7;

    function buildBoard(rows, cols) {
      var board = new Array(rows);
      for (var i = 0; i < rows; i++) {
        board[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
          board[i][j] = { value: null };
        }
      }
      return board;
    }

    function insert(col, playerId){
      for (var i = this.size.length - 1; i >= 0; i--) {
        if (!this.size[i][col].value) {
          this.size[i][col].value = playerId;
          break;
        }
      }
    }
    
    function existWinner () {
      return winCheck.horizontal() || winCheck.vertical() || winCheck.diagonalLeftToRight() || winCheck.diagonalRightToLeft();
    }

    // So unperformant, sorry, no time :(
    var winCheck = {
      wincon: 4,
      horizontal: function() {
        var win = false;
        for (var i = 0; i < BOARD_ROWS; i++) {
          var counter = 0;
          var player = null;

          for (var j = 0; j < BOARD_COLS; j++) {
            var disc = size[i][j].value;
            if (disc) {
              if (disc !== player) {
                player = disc;
                counter = 1;
              } else {
                counter++;
              }

              if (counter >= this.wincon) {
                win = true;
              }
            }
          }
        }
        return win;
      },
      vertical: function(){
        var win = false;
        for (var i = 0; i < BOARD_COLS; i++) {
          var counter = 0;
          var player = null;

          for (var j = 0; j < BOARD_ROWS; j++) {
            var disc = size[j][i].value;
            if (disc) {
              if (disc !== player) {
                player = disc;
                counter = 1;
              } else {
                counter++;
              }

              if (counter >= this.wincon) {
                win = true;
              }
            }
          }
        }
        return win;
      },
      diagonalRightToLeft: function(){
        var win = false;

        for (var i = BOARD_ROWS -1; i > BOARD_ROWS - this.wincon; i--) {
          for (var j = BOARD_COLS -1; j >= BOARD_COLS - this.wincon; j--) {
            var counter = 0;
            var player = null;

            for (var t = 0; t < this.wincon; t++) {
              var disc = size[i-t][j-t].value;
              if (disc) {
                if (disc !== player) {
                  player = disc;
                  counter = 1;
                } else {
                  counter++;
                }

                if (counter >= this.wincon) {
                  win = true;
                }
              } else {
                counter = 0;
                break;
              }
            }

          }
        }

        return win;
      },
      diagonalLeftToRight: function(){
        var win = false;

        for (var i = BOARD_ROWS -1; i > BOARD_ROWS - this.wincon ; i--) {
          for (var j = 0; j <= BOARD_COLS - this.wincon; j++) {
            var counter = 0;
            var player = null;

            for (var t = 0; t < this.wincon; t++) {
              var disc = size[i-t][j+t].value;
              if (disc) {
                if (disc !== player) {
                  player = disc;
                  counter = 1;
                } else {
                  counter++;
                }

                if (counter >= this.wincon) {
                  win = true;
                }
              } else {
                counter = 0;
                break;
              }
            }
          }
        }

        return win;
      }
    };

    var size = buildBoard(BOARD_ROWS, BOARD_COLS);



    return {
      size: size,
      insert: insert,
      existWinner: existWinner
    };

  });
