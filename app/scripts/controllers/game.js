(function () {
'use strict';

  /**
   * @ngdoc function
   * @name devigetApp.controller:AboutCtrl
   * @description
   * # GameCtrl
   * Controller of the devigetApp
   */
  angular.module('devigetApp')
    .controller('GameCtrl', function ($scope, $state, board, playerId) {
      
      /**
       *  Initializes the game
       */
      (function init(){
        $scope.board = board;
      })();

      $scope.actions = {
        setDisc: function(col) {
          board.insert(col, playerId);
          if (!board.existWinner()) {
            this.changeTurn();
          } else {
            $scope.win = true;
          }
        },

        changeTurn: function() {
          var PLAYER_ONE = '1';
          var PLAYER_TWO = '2';

          var nextPlayerId = (playerId === PLAYER_ONE) ? PLAYER_TWO : PLAYER_ONE;
          $state.go('game', {playerId: nextPlayerId});
        },

        restart: function(){
          $state.go('main', {reload: true});
        }

      };

    });
})();